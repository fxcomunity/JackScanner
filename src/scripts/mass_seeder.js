import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import ws from 'ws';
import path from 'path';

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Setup Neon Pool with WebSocket support for Node.js
const pool = new Pool({
  connectionString: process.env.VITE_NEON_DB_URL,
  webSocket: ws
});

// ==========================================
// KUMPULAN DATA SEEDER (Bisa mencapai Ribuan)
// ==========================================
const mockData = [
  {
    search_keywords: 'monitor, tv, layar',
    name_id: 'Layar Monitor LCD/LED',
    name_en: 'LCD/LED Monitor Display',
    category: 'Elektronik Visual',
    composition: 'Mengandung panel kaca ganda dengan lapisan kristal cair (Liquid Crystal) di antaranya. Layar diterangi oleh deretan Lampu LED (Light Emitting Diodes) di bagian belakang yang mengandung material Indium Gallium Nitride.',
    hazard: 'Panel kaca rentan pecah. Mengandung Indium yang dapat meracuni lingkungan jika dibuang ke TPA (Tempat Pembuangan Akhir).',
    fun_fact: 'Molekul kristal cair di layar Anda tidak berbentuk padat atau cair, melainkan benda "Fase Keempat" yang berubah arah saat disetrum listrik.',
    chemicals: [
      { chem_name: 'Kristal Cair (Biphenyls/Cyanobiphenyls)', chem_desc: 'Senyawa organik yang bisa memutar gelombang cahaya untuk menampilkan warna.' },
      { chem_name: 'Indium Tin Oxide (ITO)', chem_desc: 'Film konduktif transparan yang dioleskan pada kaca monitor agar listrik bisa mengalir tanpa menutupi gambar.' },
      { chem_name: 'Gallium Nitride (GaN)', chem_desc: 'Bahan semikonduktor yang memancarkan cahaya putih/biru terang di belakang panel layar.' }
    ]
  },
  {
    search_keywords: 't-shirt, baju, kaos, kemeja',
    name_id: 'Baju Kaos Katun',
    name_en: 'Cotton T-Shirt',
    category: 'Pakaian / Tekstil',
    composition: 'Sebagian besar terbuat dari benang Kapas (Katun) yang merupakan serat polimer murni organik (Selulosa). Pakaian modern sering dicampur dengan Polyester atau Elastane (Spandex) agar lentur dan tidak mudah kusut.',
    hazard: 'Polyester pada pakaian melepaskan ribuan serat mikroplastik ke lautan setiap kali dicuci menggunakan mesin cuci.',
    fun_fact: 'Serat Spandex di dalam pakaian Anda bisa direntangkan hingga 600% dari panjang aslinya tanpa putus!',
    chemicals: [
      { chem_name: 'Selulosa Alami', chem_desc: 'Rantai gula molekuler raksasa yang membangun serat kapas alami.' },
      { chem_name: 'Polyethylene Terephthalate (Polyester)', chem_desc: 'Serat plastik buatan yang murah, kuat, dan anti-air. Membantu baju cepat kering.' },
      { chem_name: 'Pewarna Azo (Azo Dyes)', chem_desc: 'Senyawa kimia sintetis kompleks yang digunakan untuk memberikan warna-warni cerah pada benang kain.' }
    ]
  }
];

// ==========================================
// FUNGSI UTAMA INJECTOR
// ==========================================
async function runSeeder() {
  console.log('🤖 MENYALAKAN MASS SEEDER BOT...');
  console.log(`Menyambung ke Database Neon: ${process.env.VITE_NEON_DB_URL ? "BERHASIL" : "GAGAL (Cek .env!)"}`);

  if (!process.env.VITE_NEON_DB_URL) process.exit(1);

  try {
    // Sinkronisasi ulang urutan ID otomatis (agar tidak error "duplicate key value")
    console.log('🔄 Memperbaiki sinkronisasi urutan ID (Sequence)...');
    await pool.query(`SELECT setval('items_id_seq', COALESCE((SELECT MAX(id)+1 FROM items), 1), false);`);
    await pool.query(`SELECT setval('chemicals_id_seq', COALESCE((SELECT MAX(id)+1 FROM chemicals), 1), false);`);
  } catch (seqErr) {
    console.log('⚠️ Peringatan Sinkronisasi (Bisa diabaikan jika tabel masih kosong):', seqErr.message);
  }

  let successCount = 0;

  for (const item of mockData) {
    try {
      // 1. Insert ke tabel items
      const insertItemQuery = `
        INSERT INTO items (search_keywords, name_id, name_en, category, composition, hazard, fun_fact) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        ON CONFLICT (search_keywords) DO NOTHING 
        RETURNING id;
      `;
      const itemValues = [
        item.search_keywords, item.name_id, item.name_en, item.category, 
        item.composition, item.hazard, item.fun_fact
      ];
      
      const res = await pool.query(insertItemQuery, itemValues);
      
      // Jika data masuk (tidak duplikat), masukkan tabel chemicals
      if (res.rows.length > 0) {
        const itemId = res.rows[0].id;

        for (const chem of item.chemicals) {
          await pool.query(
            `INSERT INTO chemicals (item_id, chem_name, chem_desc) VALUES ($1, $2, $3)`,
            [itemId, chem.chem_name, chem.chem_desc]
          );
        }
        successCount++;
        console.log(`✅ [SUKSES] Menyuntikkan Data: ${item.name_id}`);
      } else {
        console.log(`⚠️ [DUPLIKAT] Data terlewati: ${item.name_id}`);
      }

    } catch (err) {
      console.error(`❌ [ERROR] Gagal memasukkan ${item.name_id}:`, err.message);
    }
  }

  console.log('\n=============================================');
  console.log(`🎯 SEEDING SELESAI! Total disuntik: ${successCount} data.`);
  console.log('Anda bisa menambahkan ribuan data lagi di dalam array mockData di script ini.');
  console.log('=============================================');

  await pool.end(); // Tutup koneksi agar terminal bisa selesai
}

runSeeder();
