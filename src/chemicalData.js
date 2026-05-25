export const massiveDatabase = {
  "lighter": {
    name: "Korek Api Gas",
    type: "Alat Pembakar",
    composition: "Plastik, Logam, Gas Butana",
    chemicals: [
      { name: "Butana (C4H10)", desc: "Gas hidrokarbon cair bertekanan sebagai bahan bakar." },
      { name: "Ferrocerium", desc: "Paduan logam yang menghasilkan percikan api panas." }
    ],
    hazard: "Sangat mudah meledak jika terkena panas ekstrem.",
    funFact: "Korek api ditemukan sebelum korek kayu modern!"
  },
  "match": {
    name: "Korek Api Kayu",
    type: "Alat Pembakar",
    composition: "Kayu, Fosfor, Belerang",
    chemicals: [
      { name: "Kalium Klorat", desc: "Oksidator yang bereaksi dengan fosfor menghasilkan api." },
      { name: "Fosfor Merah", desc: "Berada pada sisi kotak untuk memicu nyala api." }
    ],
    hazard: "Mudah terbakar dan menghasilkan gas sulfur.",
    funFact: "Fosfor merah dipisah ke kotak (safety match) agar tidak menyala sendiri."
  },
  "bathing cap": {
    name: "Topi Renang (Bathing Cap)",
    type: "Aksesoris Olahraga",
    composition: "Silikon atau Lateks Polimer",
    chemicals: [
      { name: "Polydimethylsiloxane (PDMS)", desc: "Silikon elastis dan tahan air tingkat tinggi." },
      { name: "Lateks Alami", desc: "Karet alami dari getah pohon, sering dipakai pada versi murah." }
    ],
    hazard: "Bisa memicu alergi bagi mereka yang sensitif terhadap lateks alami.",
    funFact: "AI MobileNet sering keliru mengira benda bulat/lonjong sebagai topi renang!"
  },
  "swimming cap": {
    name: "Topi Renang (Bathing Cap)",
    type: "Aksesoris Olahraga",
    composition: "Silikon atau Lateks Polimer",
    chemicals: [
      { name: "Polydimethylsiloxane", desc: "Silikon tahan air." }
    ],
    hazard: "Aman, hindari benda tajam yang bisa menyobek materialnya.",
    funFact: "Sangat efektif mengurangi gesekan air saat berenang."
  },
  "banana": {
    name: "Pisang",
    type: "Buah-buahan",
    composition: "Air, Karbohidrat, Gula Alami",
    chemicals: [
      { name: "Kalium (K)", desc: "Mineral esensial untuk otot manusia." },
      { name: "Fruktosa", desc: "Gula alami yang memberikan energi." }
    ],
    hazard: "Aman. Kulitnya bisa membuat orang terpeleset.",
    funFact: "Pisang secara alami sedikit radioaktif karena isotop Kalium-40."
  },
  "apple": {
    name: "Apel",
    type: "Buah-buahan",
    composition: "Air, Serat, Fruktosa",
    chemicals: [
      { name: "Asam Malat", desc: "Memberikan rasa sedikit asam dan segar." },
      { name: "Selulosa", desc: "Serat makanan yang tidak bisa dicerna tubuh manusia." }
    ],
    hazard: "Biji apel mengandung Amigdalin yang berubah menjadi Sianida jika dikunyah dalam jumlah banyak.",
    funFact: "Ada lebih dari 7.500 varietas apel yang ditanam di seluruh dunia."
  },
  "water bottle": {
    name: "Botol Air Plastik",
    type: "Wadah / Plastik",
    composition: "Plastik PET",
    chemicals: [
      { name: "Polietilena Tereftalat (PET)", desc: "Plastik ringan, bening, dan tahan banting." },
      { name: "Antimon (Sb)", desc: "Katalis dalam pembuatan PET." }
    ],
    hazard: "Jangan digunakan berulang kali atau dijemur, karena mikroplastik bisa luruh.",
    funFact: "Butuh 450 tahun agar botol ini terurai di alam liar."
  },
  "laptop": {
    name: "Laptop / Notebook",
    type: "Elektronik",
    composition: "Aluminium, Plastik ABS, Silikon, Lithium",
    chemicals: [
      { name: "Lithium Kobalt Oksida", desc: "Bahan utama pada sel baterai yang bisa diisi ulang." },
      { name: "Silikon Tembaga", desc: "Untuk chipset dan sirkuit." }
    ],
    hazard: "Baterai Lithium bisa terbakar hebat jika tertusuk atau overcharge.",
    funFact: "Laptop pertama di dunia beratnya mencapai 10 kilogram!"
  },
  "mouse": {
    name: "Mouse Komputer",
    type: "Periferal Elektronik",
    composition: "Plastik ABS, PCB, Optik",
    chemicals: [
      { name: "Plastik ABS", desc: "Plastik keras polimer sintetis pembungkus luar." },
      { name: "Galium Arsenida", desc: "Digunakan pada komponen LED/Laser sensor optik." }
    ],
    hazard: "Komponen elektronik mengandung limbah beracun jika dibuang sembarangan.",
    funFact: "Mouse pertama di dunia terbuat dari kayu murni."
  },
  "keyboard": {
    name: "Keyboard",
    type: "Periferal Elektronik",
    composition: "Plastik ABS, Silikon",
    chemicals: [
      { name: "Karet Silikon", desc: "Kubah membran yang memantulkan tombol kembali ke atas." }
    ],
    hazard: "Aman, tapi bisa menjadi sarang bakteri jika tidak dibersihkan.",
    funFact: "Keyboard sering kali lebih kotor dari dudukan toilet."
  },
  "cell phone": {
    name: "Smartphone / HP",
    type: "Elektronik",
    composition: "Kaca Silikat, Aluminium, Lithium, Tembaga",
    chemicals: [
      { name: "Indium Timah Oksida", desc: "Pelapis konduktif transparan agar layar sentuh berfungsi." },
      { name: "Lithium Ion", desc: "Sumber daya energi baterai." }
    ],
    hazard: "Baterai bisa meledak; radiasi rendah RF terus-menerus memicu perdebatan sains.",
    funFact: "Ada lebih banyak emas dalam 1 ton HP bekas dibandingkan 1 ton bijih emas murni!"
  },
  "pen": {
    name: "Pulpen",
    type: "Alat Tulis",
    composition: "Plastik, Logam Kuningan, Tinta",
    chemicals: [
      { name: "Pelarut Benzil Alkohol", desc: "Menjaga tinta tetap cair di dalam tabung." },
      { name: "Karbon Hitam / Pigmen", desc: "Memberikan warna pada tinta." }
    ],
    hazard: "Tinta dapat mengiritasi mata atau lambung jika tertelan.",
    funFact: "Bola kecil di ujung pulpen dibuat menggunakan material sekeras baja atau tungsten karbida."
  },
  "pencil": {
    name: "Pensil",
    type: "Alat Tulis",
    composition: "Kayu, Grafit, Tanah Liat",
    chemicals: [
      { name: "Grafit (Karbon)", desc: "Meninggalkan bekas hitam saat digesek. Ini bukan timbal!" },
      { name: "Selulosa Kayu", desc: "Sebagai pelindung struktural grafit." }
    ],
    hazard: "Sangat aman. Mitos keracunan 'timbal' pada pensil adalah salah.",
    funFact: "Satu pensil bisa digunakan untuk menarik garis sepanjang 56 kilometer."
  },
  "coffee mug": {
    name: "Cangkir Kopi (Mug)",
    type: "Peralatan Dapur",
    composition: "Keramik / Porselen",
    chemicals: [
      { name: "Silikon Dioksida (SiO2)", desc: "Komponen utama tanah liat keramik." },
      { name: "Glasir Feldspar", desc: "Pelapis kaca yang membuatnya mengkilap dan anti air." }
    ],
    hazard: "Aman. Namun, mug keramik murah berisiko melepaskan timbal dari pelapis catnya.",
    funFact: "Keramik mampu menahan suhu ekstrem tanpa meleleh."
  },
  "cup": {
    name: "Gelas",
    type: "Peralatan Dapur",
    composition: "Kaca Borosilikat atau Kaca Soda-Kapur",
    chemicals: [
      { name: "Silika (Pasir)", desc: "Bahan dasar peleburan pembuatan kaca." },
      { name: "Natrium Karbonat", desc: "Menurunkan titik leleh pasir saat proses pembuatan." }
    ],
    hazard: "Bisa pecah menjadi pecahan tajam.",
    funFact: "Kaca sebenarnya adalah cairan yang bergerak sangat lambat (amorf)."
  },
  "sunglasses": {
    name: "Kacamata Hitam",
    type: "Aksesoris",
    composition: "Plastik Polikarbonat, Lensa Anti-UV",
    chemicals: [
      { name: "Zinc Oksida / Titanium Dioksida", desc: "Sering digunakan pada lensa untuk memblokir sinar UV matahari." }
    ],
    hazard: "Aman dipakai.",
    funFact: "Awalnya dibuat untuk para hakim di Tiongkok kuno agar ekspresi mata mereka tidak terbaca."
  },
  "shoe": {
    name: "Sepatu",
    type: "Pakaian",
    composition: "Karet, Kain Sintetis, Lem Polyurethane",
    chemicals: [
      { name: "Polyurethane (PU)", desc: "Bahan busa sintetis pelindung benturan pada sol." },
      { name: "Etilena Vinil Asetat (EVA)", desc: "Bahan busa insole penyerap keringat dan guncangan." }
    ],
    hazard: "Lem sepatu bisa mengeluarkan senyawa organik volatil (VOC) saat baru dibeli.",
    funFact: "Desain sepatu sneaker pertama kali muncul pada tahun 1800-an."
  },
  "cat": {
    name: "Kucing (Felis Catus)",
    type: "Hewan Mamalia (Organik)",
    composition: "Air, Karbon, Kalsium Fosfat, Protein",
    chemicals: [
      { name: "Keratin", desc: "Protein berserat yang membentuk bulu dan cakar tajam kucing." },
      { name: "Enzim Amilase (Rendah)", desc: "Kucing karnivora murni, air liur mereka nyaris tidak mengandung amilase pemecah karbohidrat." }
    ],
    hazard: "Kucing bisa membawa parasit Toksoplasma gondii di kotorannya.",
    funFact: "Kucing tidak memiliki reseptor perasa manis di lidahnya!"
  },
  "dog": {
    name: "Anjing",
    type: "Hewan Mamalia (Organik)",
    composition: "Air, Protein, Kalsium",
    chemicals: [
      { name: "Kolagen", desc: "Membentuk tendon dan struktur ligamen yang kuat untuk berlari." }
    ],
    hazard: "Air liur bisa mengandung bakteri patogen jika anjing belum divaksin.",
    funFact: "Penciuman anjing 10.000 kali lebih tajam dari manusia."
  },
  "car": {
    name: "Mobil",
    type: "Kendaraan",
    composition: "Baja, Aluminium, Kaca, Karet, Plastik",
    chemicals: [
      { name: "Karbon Monoksida (CO)", desc: "Gas buang beracun yang dihasilkan pembakaran mesin." },
      { name: "Karet Vulkanisir", desc: "Ban yang diperkuat menggunakan sulfur agar tahan cuaca." }
    ],
    hazard: "Polusi emisi dan risiko kecelakaan kinetik tingkat tinggi.",
    funFact: "Rata-rata ada 30.000 komponen individual dalam sebuah mobil."
  }
};
