import { Pool } from '@neondatabase/serverless';

// Menginisialisasi koneksi ke Neon Tech Database
const getDbPool = () => {
  const connectionString = import.meta.env.VITE_NEON_DB_URL;
  if (!connectionString) return null;
  return new Pool({ connectionString });
};

export const getChemicalInfoFromAI = async (label, lang = 'id') => {
  const pool = getDbPool();

  if (!pool) {
    return {
      name: label,
      type: "Database Terputus",
      composition: "Sistem mendeteksi bahwa Anda belum memasukkan VITE_NEON_DB_URL ke dalam file .env.",
      chemicals: [{ name: "Koneksi Gagal", desc: "Silakan masukkan string koneksi Postgres dari Neon Tech." }],
      hazard: "Database SQL belum terhubung.",
      funFact: "Aplikasi ini menggunakan Serverless Postgres dari Neon Tech!"
    };
  }

  try {
    // 1. Mencari data benda di tabel 'items' berdasarkan label kamera / input user
    // Kita gunakan ILIKE untuk pencarian tidak sensitif huruf besar/kecil
    const cleanSearch = label.trim().toLowerCase();
    
    const itemQuery = await pool.query(
      `SELECT * FROM items WHERE search_keywords ILIKE $1 LIMIT 1`,
      [`%${cleanSearch}%`]
    );

    if (itemQuery.rows.length === 0) {
      // Benda tidak ditemukan di Database, FALLBACK KE DEEPSEEK (Lalu MISTRAL)
      console.log(`[Cache Miss] Benda "${label}" tidak ada di SQL. Memanggil AI Eksternal...`);
      const deepSeekKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
      const mistralKey = import.meta.env.VITE_MISTRAL_API_KEY;
      
      if (!deepSeekKey && !mistralKey) {
        return {
          name: label,
          type: "Database & AI Kosong",
          composition: `Benda ini belum ada di Database Neon, dan Anda belum memasukkan API Key DeepSeek atau Mistral.`,
          chemicals: [{ name: "Material Tidak Diketahui", desc: "Sistem belum memiliki data ini." }],
          hazard: "Masukkan API Key di .env untuk mengaktifkan AI Otomatis.",
          funFact: "Anda bisa menambahkan data benda ini nanti ke Neon DB."
        };
      }

      const prompt = `Analisis secara ilmiah benda ini: "${label}". Jawab dalam bahasa ${lang === 'id' ? 'Indonesia' : 'Inggris'} dan kembalikan HANYA JSON murni (TANPA block markdown \`\`\`) dengan struktur pasti seperti ini: {"name": "nama benda yang disempurnakan", "composition": "deskripsi penyusun utamanya", "chemicals": [{"name": "nama zat kimia 1", "desc": "fungsinya"}, {"name": "nama zat kimia 2", "desc": "fungsinya"}], "hazard": "potensi bahaya fisik atau lingkungan", "funFact": "fakta sains menarik terkait benda ini"}`;

      let aiResponseData = null;
      let engineUsed = "DeepSeek AI";

      try {
        if (deepSeekKey) {
          console.log("Mencoba DeepSeek API...");
          const res = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${deepSeekKey}`
            },
            body: JSON.stringify({
              model: "deepseek-chat",
              messages: [{ role: "user", content: prompt }],
              response_format: { type: "json_object" },
              temperature: 0.3
            })
          });
          if (!res.ok) throw new Error("DeepSeek gagal merespons");
          const jsonRes = await res.json();
          aiResponseData = jsonRes.choices[0].message.content;
        } else {
          throw new Error("Key DeepSeek tidak ada");
        }
      } catch (dsError) {
        console.warn("DeepSeek Error, Fallback ke Mistral...", dsError.message);
        try {
          if (mistralKey) {
            console.log("Mencoba Mistral API...");
            engineUsed = "Mistral AI";
            const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${mistralKey}`
              },
              body: JSON.stringify({
                model: "mistral-small-latest",
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" },
                temperature: 0.3
              })
            });
            if (!res.ok) throw new Error("Mistral gagal merespons");
            const jsonRes = await res.json();
            aiResponseData = jsonRes.choices[0].message.content;
          } else {
            throw new Error("Key Mistral tidak ada");
          }
        } catch (mistralError) {
           console.error("Semua AI Eksternal Gagal:", mistralError);
           return {
             name: label,
             type: "AI Error",
             composition: `Gagal memanggil DeepSeek maupun Mistral. Pastikan API Key benar dan ada kuotanya.`,
             chemicals: [{ name: "Gagal Mengambil Data", desc: "API Error" }],
             hazard: "Koneksi API terputus atau limit habis.",
             funFact: "Coba pindai ulang dalam beberapa detik."
           };
        }
      }
      
      // Jika berhasil mendapatkan data JSON dari salah satu AI
      if (aiResponseData) {
        try {
          // Membersihkan jika AI masih mengembalikan backticks
          const cleanJsonStr = aiResponseData.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsedJSON = JSON.parse(cleanJsonStr);

          return {
            name: parsedJSON.name,
            type: `Generatif AI (${engineUsed})`,
            composition: parsedJSON.composition,
            chemicals: parsedJSON.chemicals || [],
            hazard: parsedJSON.hazard,
            funFact: parsedJSON.funFact
          };
        } catch (parseError) {
          console.error("Gagal parse JSON dari AI:", parseError);
          return {
             name: label,
             type: `AI Parse Error (${engineUsed})`,
             composition: `AI memberikan format JSON yang rusak.`,
             chemicals: [],
             hazard: "-",
             funFact: "-"
          };
        }
      }
    }

    const itemData = itemQuery.rows[0];

    // 2. Mencari rincian bahan kimia dari tabel 'chemicals'
    const chemQuery = await pool.query(
      `SELECT chem_name, chem_desc FROM chemicals WHERE item_id = $1`,
      [itemData.id]
    );

    const chemicals = chemQuery.rows.length > 0 
      ? chemQuery.rows.map(row => ({ name: row.chem_name, desc: row.chem_desc }))
      : [{ name: "Campuran Umum", desc: "Bahan spesifik belum dicatat." }];

    // 3. Mengembalikan JSON terstruktur sesuai format UI
    return {
      name: lang === 'id' ? itemData.name_id : itemData.name_en,
      type: "Data Lokal (Neon SQL)",
      composition: itemData.composition,
      chemicals: chemicals,
      hazard: itemData.hazard,
      funFact: itemData.fun_fact
    };

  } catch (error) {
    console.error("Database Query Error:", error);
    return {
      name: label,
      type: "Query SQL Gagal",
      composition: "Terjadi kesalahan saat mengeksekusi perintah SQL di server Neon.",
      chemicals: [{ name: "System Error", desc: error.message }],
      hazard: "Periksa kembali koneksi jaringan atau skema tabel SQL Anda.",
      funFact: "Log error sudah dicetak ke konsol browser."
    };
  }
};
