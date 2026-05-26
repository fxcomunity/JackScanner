import { Pool } from '@neondatabase/serverless';
import { languages } from './i18n';

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
          type: "Data Tidak Ditemukan",
          composition: `Benda ini belum ada di database sistem kami.`,
          chemicals: [{ name: "Material Tidak Diketahui", desc: "Sistem belum memiliki data ini." }],
          hazard: "Data belum tersedia.",
          funFact: "Anda bisa menambahkan data benda ini nanti ke sistem."
        };
      }

      const targetLangName = languages.find(l => l.code === lang)?.name || 'English';
      const prompt = `Analisis secara ilmiah dan mendalam benda ini: "${label}". Jawab dalam bahasa ${targetLangName}. Berikan penjelasan yang sangat rinci dan detail. SANGAT PENTING: Data yang diberikan harus 100% akurat secara ilmiah dan faktual berdasarkan ilmu kimia/fisika, JANGAN MENGARANG ATAU MENEBAK ASAL-ASALAN (No Hallucination). JIKA benda tersebut memiliki unsur atau zat kimia yang jelas (misalnya Air, Garam, dll), sertakan rumus kimianya (seperti H2O, NaCl). JIKA berupa material kompleks (seperti Kayu, Plastik Polimer), cukup sebutkan nama ilmiah/senyawa utamanya tanpa memaksa rumus kimia yang tidak relevan. Kembalikan HANYA JSON murni (TANPA block markdown \`\`\`) dengan struktur pasti seperti ini: {"name": "nama spesifik benda/zat", "composition": "deskripsi detail penyusun utamanya", "chemicals": [{"name": "nama zat (dan rumus kimianya JIKA ADA)", "desc": "penjelasan detail fungsi/peran zat tersebut"}], "hazard": "potensi bahaya fisik, kimia, atau lingkungan secara spesifik", "funFact": "fakta sains kimia/fisika menarik terkait benda ini"}`;

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
             type: "Koneksi Terputus",
             composition: `Gagal terhubung ke server utama.`,
             chemicals: [{ name: "Gagal Mengambil Data", desc: "Network Error" }],
             hazard: "Koneksi sistem terputus.",
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

          // Fungsi pembantu untuk memastikan nilai selalu berupa string
          const safeString = (val) => {
            if (!val) return "-";
            if (typeof val === 'string') return val;
            if (typeof val === 'object') return Object.entries(val).map(([k, v]) => `${k}: ${v}`).join(", ");
            return String(val);
          };

          return {
            name: safeString(parsedJSON.name),
            type: `Smart Engine`,
            composition: safeString(parsedJSON.composition),
            chemicals: Array.isArray(parsedJSON.chemicals) ? parsedJSON.chemicals : [],
            hazard: safeString(parsedJSON.hazard),
            funFact: safeString(parsedJSON.funFact)
          };
        } catch (parseError) {
          console.error("Gagal parse JSON dari AI:", parseError);
          return {
             name: label,
             type: `System Error`,
             composition: `Sistem menerima data dengan format yang tidak valid.`,
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
