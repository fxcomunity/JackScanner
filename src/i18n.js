export const languages = [
  { code: 'id', country: 'id', name: 'Bahasa Indonesia' },
  { code: 'en', country: 'us', name: 'English' },
  { code: 'es', country: 'es', name: 'Español' },
  { code: 'fr', country: 'fr', name: 'Français' },
  { code: 'de', country: 'de', name: 'Deutsch' },
  { code: 'ja', country: 'jp', name: '日本語' },
  { code: 'zh', country: 'cn', name: '中文' },
  { code: 'ar', country: 'sa', name: 'العربية' },
  { code: 'ru', country: 'ru', name: 'Русский' },
  { code: 'pt', country: 'br', name: 'Português' },
  { code: 'hi', country: 'in', name: 'हिन्दी' },
  { code: 'ko', country: 'kr', name: '한국어' }
];

export const i18n = {
  id: {
    appTitle: "Pemindai Barang Pintar",
    appSubtitle: "Arahkan kamera ke benda apapun untuk membedah komposisi kimia & ensiklopedianya secara instan.",
    wikiGraphTitle: "Graf Pengetahuan Wikidata",
    wikiGraphDesc: "Pemetaan entitas lintas bahasa menggunakan Wikidata untuk mengidentifikasi material secara akurat terlepas dari pilihan bahasa Anda.",
    wikiIntegTitle: "Integrasi Wikipedia",
    wikiIntegDesc: "Menarik kutipan ensiklopedia yang faktual dan andal secara langsung melalui Wikipedia REST API tanpa bergantung pada generator teks AI yang tidak stabil.",
    scanner: { initializing: "Mempersiapkan Kamera...", loadingModel: "Menyiapkan Pemindai...", pointCamera: "Arahkan Benda ke Sini", switchCamera: "Ganti Kamera", scanButton: "Pindai Benda Sekarang", stopCamera: "Matikan Kamera", modeCamera: "Kamera", modeUpload: "Unggah Foto", selectImage: "Pilih Gambar" },
    results: { analyzing: "Menganalisis Material...", contactingDb: "Menghubungi Database Global...", confidence: "Tingkat Keyakinan", originalLabel: "Label Asli", scanAnother: "Pindai Benda Lain", alternative: "Hasil kurang akurat? Pilih kemungkinan lain:", composition: "Ringkasan Wikipedia", chemicalsTitle: "Kandungan Material", hazard: "Catatan Keamanan", funFact: "Fakta Ekstra" },
    profile: { devTitle: "Profil Developer", devSubtitle: "Mengenal lebih dekat pembuat aplikasi ini", leadDev: "Lead Developer", devDesc: "Mahasiswa semester 2 di program studi <b>Sistem Informasi</b>, dari <b>Universitas Bina Sarana Informatika</b>. Berkomitmen untuk terus belajar dan menciptakan solusi teknologi yang bermanfaat dan inovatif.", campusTitle: "Profil Kampus", campusName: "Universitas Bina Sarana Informatika", campusBranch: "Kampus Cengkareng (UBSI)", campusDesc: "BSI Cengkareng merupakan salah satu kampus Universitas Bina Sarana Informatika yang berlokasi strategis di Jakarta Barat. Berfokus pada pendidikan berkualitas di bidang Teknologi Informasi dan Bisnis dengan fasilitas penunjang untuk menciptakan generasi mandiri dan inovatif.", address: "Jl. Kamal Raya No.18, RT.6/RW.3, Cengkareng Bar., Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11730", footerPowered: "Ditenagai oleh MobileNet, Wikidata, dan Wikipedia REST API." }
  },
  en: {
    appTitle: "Smart Object Scanner",
    appSubtitle: "Point the camera at any object to instantly dissect its chemical composition & encyclopedia data.",
    wikiGraphTitle: "Wikidata Knowledge Graph",
    wikiGraphDesc: "Cross-lingual entity mapping using Wikidata to accurately identify materials regardless of your language choice.",
    wikiIntegTitle: "Wikipedia Integration",
    wikiIntegDesc: "Pulling factual, reliable encyclopedia extracts directly via the Wikipedia REST API without relying on flaky AI text generators.",
    scanner: { initializing: "Initializing Camera...", loadingModel: "Preparing Scanner...", pointCamera: "Point Object Here", switchCamera: "Switch Camera", scanButton: "Scan Object Now", stopCamera: "Stop Camera", modeCamera: "Camera", modeUpload: "Upload Photo", selectImage: "Select Image" },
    results: { analyzing: "Analyzing Materials...", contactingDb: "Contacting Global Database...", confidence: "Confidence Level", originalLabel: "Original Label", scanAnother: "Scan Another Object", alternative: "Inaccurate result? Pick an alternative:", composition: "Wikipedia Summary", chemicalsTitle: "Material Composition", hazard: "Safety Notes", funFact: "Extra Fact" },
    profile: { devTitle: "Developer Profile", devSubtitle: "Get to know the creator of this application", leadDev: "Lead Developer", devDesc: "2nd-semester Information Systems student from <b>Bina Sarana Informatika University</b>. Committed to continuous learning and creating useful, innovative technological solutions.", campusTitle: "Campus Profile", campusName: "Bina Sarana Informatika University", campusBranch: "Cengkareng Campus (UBSI)", campusDesc: "BSI Cengkareng is one of the strategically located campuses of Bina Sarana Informatika University in West Jakarta. Focused on quality education in Information Technology and Business with supporting facilities to create an independent and innovative generation.", address: "Jl. Kamal Raya No.18, RT.6/RW.3, West Cengkareng, Cengkareng District, West Jakarta City, Special Capital Region of Jakarta 11730", footerPowered: "Powered by MobileNet, Wikidata, and Wikipedia REST API." }
  },
  es: {
    appTitle: "Escáner Inteligente de Objetos",
    appSubtitle: "Apunta la cámara a cualquier objeto para diseccionar al instante su composición.",
    wikiGraphTitle: "Gráfico de Conocimiento Wikidata",
    wikiGraphDesc: "Mapeo de entidades multilingüe usando Wikidata para identificar materiales con precisión.",
    wikiIntegTitle: "Integración de Wikipedia",
    wikiIntegDesc: "Extrayendo información factual de enciclopedia directamente a través de la API REST de Wikipedia.",
    scanner: { initializing: "Iniciando Cámara...", loadingModel: "Preparando Escáner...", pointCamera: "Apunta el Objeto Aquí", switchCamera: "Cambiar Cámara", scanButton: "Escanear Objeto Ahora", stopCamera: "Detener Cámara", modeCamera: "Cámara", modeUpload: "Subir Foto", selectImage: "Seleccionar Imagen" },
    results: { analyzing: "Analizando Materiales...", contactingDb: "Contactando Base de Datos...", confidence: "Nivel de Confianza", originalLabel: "Etiqueta Original", scanAnother: "Escanear Otro Objeto", alternative: "¿Resultado inexacto? Elige alternativa:", composition: "Resumen de Wikipedia", chemicalsTitle: "Composición del Material", hazard: "Notas de Seguridad", funFact: "Dato Curioso" },
    profile: { devTitle: "Perfil del Desarrollador", devSubtitle: "Conoce más sobre el creador de esta aplicación", leadDev: "Desarrollador Principal", devDesc: "Estudiante de 2º semestre de Sistemas de Información de la <b>Universidad Bina Sarana Informatika</b>. Comprometido con el aprendizaje continuo.", campusTitle: "Perfil del Campus", campusName: "Universidad Bina Sarana Informatika", campusBranch: "Campus Cengkareng (UBSI)", campusDesc: "BSI Cengkareng es uno de los campus estratégicamente ubicados de la Universidad Bina Sarana Informatika en el oeste de Yakarta.", address: "Jl. Kamal Raya No.18, RT.6/RW.3, Cengkareng Bar., Yakarta Occidental 11730", footerPowered: "Impulsado por MobileNet, Wikidata y Wikipedia REST API." }
  },
  fr: {
    appTitle: "Scanner d'Objets Intelligent",
    appSubtitle: "Pointez la caméra sur n'importe quel objet pour disséquer sa composition chimique.",
    wikiGraphTitle: "Graphe de Connaissances Wikidata",
    wikiGraphDesc: "Cartographie des entités multilingues à l'aide de Wikidata pour identifier les matériaux avec précision.",
    wikiIntegTitle: "Intégration Wikipédia",
    wikiIntegDesc: "Extraction d'extraits d'encyclopédie factuels directement via l'API REST de Wikipédia.",
    scanner: { initializing: "Initialisation de la Caméra...", loadingModel: "Préparation du Scanner...", pointCamera: "Pointez l'Objet Ici", switchCamera: "Changer de Caméra", scanButton: "Scanner l'Objet", stopCamera: "Arrêter la Caméra", modeCamera: "Caméra", modeUpload: "Téléverser Photo", selectImage: "Sélectionner Image" },
    results: { analyzing: "Analyse des Matériaux...", contactingDb: "Contact Base de Données...", confidence: "Niveau de Confiance", originalLabel: "Étiquette Originale", scanAnother: "Scanner un Autre Objet", alternative: "Résultat inexact ? Choisissez:", composition: "Résumé Wikipédia", chemicalsTitle: "Composition des Matériaux", hazard: "Notes de Sécurité", funFact: "Fait Amusant" },
    profile: { devTitle: "Profil du Développeur", devSubtitle: "Apprenez-en plus sur le créateur", leadDev: "Développeur Principal", devDesc: "Étudiant de 2e semestre en Systèmes d'Information à l'<b>Université Bina Sarana Informatika</b>. Engagé dans l'apprentissage continu.", campusTitle: "Profil du Campus", campusName: "Université Bina Sarana Informatika", campusBranch: "Campus Cengkareng (UBSI)", campusDesc: "BSI Cengkareng est l'un des campus stratégiquement situés de l'Université Bina Sarana Informatika à l'ouest de Jakarta.", address: "Jl. Kamal Raya No.18, RT.6/RW.3, Cengkareng Bar., Jakarta Ouest 11730", footerPowered: "Propulsé par MobileNet, Wikidata et l'API REST de Wikipédia." }
  },
  de: {
    appTitle: "Intelligenter Objekt-Scanner",
    appSubtitle: "Richten Sie die Kamera auf ein Objekt, um seine Zusammensetzung zu analysieren.",
    wikiGraphTitle: "Wikidata Wissensgraph",
    wikiGraphDesc: "Sprachübergreifende Entitätszuordnung mithilfe von Wikidata zur genauen Materialidentifizierung.",
    wikiIntegTitle: "Wikipedia-Integration",
    wikiIntegDesc: "Direkter Abruf sachlicher Enzyklopädie-Auszüge über die Wikipedia-REST-API.",
    scanner: { initializing: "Kamera Initialisieren...", loadingModel: "Scanner wird vorbereitet...", pointCamera: "Objekt Hierhin Richten", switchCamera: "Kamera Wechseln", scanButton: "Objekt Jetzt Scannen", stopCamera: "Kamera Stoppen", modeCamera: "Kamera", modeUpload: "Foto Hochladen", selectImage: "Bild Auswählen" },
    results: { analyzing: "Materialien Analysieren...", contactingDb: "Globale Datenbank...", confidence: "Konfidenzniveau", originalLabel: "Originaletikett", scanAnother: "Anderes Objekt Scannen", alternative: "Ungenaues Ergebnis? Wähle:", composition: "Wikipedia-Zusammenfassung", chemicalsTitle: "Materialzusammensetzung", hazard: "Sicherheitshinweise", funFact: "Zusätzlicher Fakt" },
    profile: { devTitle: "Entwicklerprofil", devSubtitle: "Lernen Sie den Ersteller dieser Anwendung kennen", leadDev: "Hauptentwickler", devDesc: "Student der Wirtschaftsinformatik im 2. Semester an der <b>Bina Sarana Informatika Universität</b>.", campusTitle: "Campus-Profil", campusName: "Bina Sarana Informatika Universität", campusBranch: "Campus Cengkareng (UBSI)", campusDesc: "BSI Cengkareng ist einer der strategisch günstig gelegenen Standorte der Bina Sarana Informatika Universität in West-Jakarta.", address: "Jl. Kamal Raya No.18, RT.6/RW.3, West-Jakarta 11730", footerPowered: "Unterstützt von MobileNet, Wikidata und der Wikipedia-REST-API." }
  },
  ja: {
    appTitle: "スマートオブジェクトスキャナー",
    appSubtitle: "カメラをオブジェクトに向けて、その化学組成を即座に分析します。",
    wikiGraphTitle: "Wikidataナレッジグラフ",
    wikiGraphDesc: "Wikidataを使用した言語横断的なエンティティマッピングにより、材料を正確に特定します。",
    wikiIntegTitle: "Wikipedia統合",
    wikiIntegDesc: "Wikipedia REST APIを介して、事実に基づいた百科事典の抜粋を直接取得します。",
    scanner: { initializing: "カメラを初期化中...", loadingModel: "スキャナーを準備中...", pointCamera: "ここにオブジェクトを向ける", switchCamera: "カメラを切り替える", scanButton: "スキャン", stopCamera: "カメラを停止", modeCamera: "カメラ", modeUpload: "アップロード", selectImage: "画像を選択" },
    results: { analyzing: "材料を分析中...", contactingDb: "データベースに接続中...", confidence: "信頼度", originalLabel: "元のラベル", scanAnother: "別のオブジェクト", alternative: "代替を選択:", composition: "Wikipediaの概要", chemicalsTitle: "材料組成", hazard: "安全上の注意", funFact: "豆知識" },
    profile: { devTitle: "開発者プロフィール", devSubtitle: "このアプリの作成者について", leadDev: "リード開発者", devDesc: "<b>ビナ・サラナ・インフォマティカ大学</b>情報システム学科の2年生。継続的な学習に尽力しています。", campusTitle: "キャンパスプロフィール", campusName: "ビナ・サラナ・インフォマティカ大学", campusBranch: "チェンカレンキャンパス (UBSI)", campusDesc: "BSIチェンカレンは、西ジャカルタにある戦略的に配置されたキャンパスの1つです。", address: "Jl. Kamal Raya No.18, RT.6/RW.3, Cengkareng Bar., West Jakarta 11730", footerPowered: "MobileNet、Wikidata、Wikipedia REST APIを利用" }
  },
  zh: {
    appTitle: "智能物品扫描仪",
    appSubtitle: "将相机对准任何物品即可瞬间剖析其化学成分。",
    wikiGraphTitle: "维基数据知识图谱",
    wikiGraphDesc: "使用维基数据进行跨语言实体映射，准确识别材料。",
    wikiIntegTitle: "维基百科整合",
    wikiIntegDesc: "直接通过维基百科 REST API 提取事实可靠的百科全书摘要。",
    scanner: { initializing: "初始化相机...", loadingModel: "准备扫描仪...", pointCamera: "将物品对准此处", switchCamera: "切换相机", scanButton: "扫描物品", stopCamera: "停止相机", modeCamera: "相机", modeUpload: "上传", selectImage: "选择图片" },
    results: { analyzing: "正在分析...", contactingDb: "连接数据库...", confidence: "置信度", originalLabel: "原始标签", scanAnother: "扫描其他", alternative: "选择其他可能：", composition: "维基百科摘要", chemicalsTitle: "材料成分", hazard: "安全须知", funFact: "趣味科普" },
    profile: { devTitle: "开发者资料", devSubtitle: "了解此应用程序的创建者", leadDev: "首席开发者", devDesc: "来自<b>比纳萨拉纳信息大学</b>信息系统专业大二学生。致力于不断学习和创造创新的技术解决方案。", campusTitle: "校园简介", campusName: "比纳萨拉纳信息大学", campusBranch: "Cengkareng 校区 (UBSI)", campusDesc: "BSI Cengkareng 是位于西雅加达的一所地理位置优越的校区，专注于信息技术和商业的高质量教育。", address: "Jl. Kamal Raya No.18, 西雅加达 11730", footerPowered: "由 MobileNet, Wikidata 和 Wikipedia REST API 提供支持。" }
  },
  ar: {
    appTitle: "الماسح الضوئي الذكي للأشياء",
    appSubtitle: "وجه الكاميرا إلى أي كائن لتحليل تركيبته الكيميائية.",
    wikiGraphTitle: "الرسم البياني المعرفي لويكي بيانات",
    wikiGraphDesc: "تعيين الكيانات عبر اللغات باستخدام ويكي بيانات لتحديد المواد بدقة.",
    wikiIntegTitle: "تكامل ويكيبيديا",
    wikiIntegDesc: "سحب مقتطفات موسوعية واقعية مباشرة عبر واجهة برمجة تطبيقات ويكيبيديا.",
    scanner: { initializing: "جاري تهيئة الكاميرا...", loadingModel: "جاري إعداد الماسح...", pointCamera: "وجه الكائن هنا", switchCamera: "تبديل الكاميرا", scanButton: "امسح الآن", stopCamera: "إيقاف الكاميرا", modeCamera: "الكاميرا", modeUpload: "رفع", selectImage: "اختر صورة" },
    results: { analyzing: "جاري التحليل...", contactingDb: "الاتصال بقاعدة البيانات...", confidence: "مستوى الثقة", originalLabel: "التسمية الأصلية", scanAnother: "مسح كائن آخر", alternative: "اختر بديلاً:", composition: "ملخص ويكيبيديا", chemicalsTitle: "التركيب المادي", hazard: "ملاحظات السلامة", funFact: "حقيقة" },
    profile: { devTitle: "ملف المطور", devSubtitle: "تعرف على منشئ هذا التطبيق", leadDev: "المطور الرئيسي", devDesc: "طالب في الفصل الدراسي الثاني في نظم المعلومات من <b>جامعة بينا سارانا إنفورماتيكا</b>.", campusTitle: "ملف الحرم الجامعي", campusName: "جامعة بينا سارانا إنفورماتيكا", campusBranch: "حرم سينغكارينغ (UBSI)", campusDesc: "يعد BSI Cengkareng أحد الأحرم الجامعية ذات الموقع الاستراتيجي لجامعة Bina Sarana Informatika.", address: "Jl. Kamal Raya No.18، جاكرتا الغربية 11730", footerPowered: "بدعم من MobileNet و Wikidata و Wikipedia REST API." }
  },
  ru: {
    appTitle: "Умный Сканер Объектов",
    appSubtitle: "Наведите камеру на любой объект для мгновенного анализа.",
    wikiGraphTitle: "Граф знаний Wikidata",
    wikiGraphDesc: "Межъязыковое сопоставление сущностей с использованием Wikidata для точной идентификации материалов.",
    wikiIntegTitle: "Интеграция с Wikipedia",
    wikiIntegDesc: "Получение достоверных энциклопедических данных напрямую через Wikipedia REST API.",
    scanner: { initializing: "Инициализация...", loadingModel: "Подготовка...", pointCamera: "Наведите сюда", switchCamera: "Переключить", scanButton: "Сканировать", stopCamera: "Остановить", modeCamera: "Камера", modeUpload: "Загрузить", selectImage: "Выбрать" },
    results: { analyzing: "Анализ...", contactingDb: "Связь с БД...", confidence: "Уверенность", originalLabel: "Метка", scanAnother: "Другой объект", alternative: "Выберите вариант:", composition: "Сводка Википедии", chemicalsTitle: "Состав", hazard: "Опасности", funFact: "Факт" },
    profile: { devTitle: "Профиль разработчика", devSubtitle: "Узнайте больше о создателе", leadDev: "Ведущий разработчик", devDesc: "Студент 2-го семестра факультета информационных систем <b>Университета Бина Сарана Информатика</b>.", campusTitle: "Профиль кампуса", campusName: "Университет Бина Сарана Информатика", campusBranch: "Кампус Ченгкаренг (UBSI)", campusDesc: "BSI Cengkareng — один из стратегически удачно расположенных кампусов в Западной Джакарте.", address: "Jl. Kamal Raya No.18, Западная Джакарта 11730", footerPowered: "На базе MobileNet, Wikidata и Wikipedia REST API." }
  },
  pt: {
    appTitle: "Scanner Inteligente",
    appSubtitle: "Aponte a câmera para qualquer objeto para dissecar sua composição.",
    wikiGraphTitle: "Gráfico de Conhecimento Wikidata",
    wikiGraphDesc: "Mapeamento de entidades multilíngue usando Wikidata para identificar materiais com precisão.",
    wikiIntegTitle: "Integração Wikipedia",
    wikiIntegDesc: "Extração de dados enciclopédicos confiáveis diretamente via Wikipedia REST API.",
    scanner: { initializing: "Inicializando...", loadingModel: "Preparando...", pointCamera: "Aponte Aqui", switchCamera: "Mudar Câmera", scanButton: "Escanear", stopCamera: "Parar", modeCamera: "Câmera", modeUpload: "Enviar", selectImage: "Selecionar" },
    results: { analyzing: "Analisando...", contactingDb: "Contatando BD...", confidence: "Confiança", originalLabel: "Rótulo Original", scanAnother: "Escanear Outro", alternative: "Escolha uma alternativa:", composition: "Resumo da Wikipedia", chemicalsTitle: "Composição", hazard: "Segurança", funFact: "Fato Curioso" },
    profile: { devTitle: "Perfil do Desenvolvedor", devSubtitle: "Conheça o criador deste aplicativo", leadDev: "Desenvolvedor Principal", devDesc: "Estudante do 2º semestre de Sistemas de Informação da <b>Universidade Bina Sarana Informatika</b>.", campusTitle: "Perfil do Campus", campusName: "Universidade Bina Sarana Informatika", campusBranch: "Campus Cengkareng (UBSI)", campusDesc: "O BSI Cengkareng é um dos campi estrategicamente localizados da Universidade Bina Sarana Informatika, no oeste de Jacarta.", address: "Jl. Kamal Raya No.18, Jacarta Ocidental 11730", footerPowered: "Desenvolvido com MobileNet, Wikidata e Wikipedia REST API." }
  },
  hi: {
    appTitle: "स्मार्ट स्कैनर",
    appSubtitle: "किसी भी वस्तु के रासायनिक संरचना का विश्लेषण करने के लिए कैमरा इंगित करें।",
    wikiGraphTitle: "विकिडेटा ज्ञान ग्राफ",
    wikiGraphDesc: "आपकी भाषा पसंद की परवाह किए बिना सामग्री की सटीक पहचान करने के लिए विकिडेटा का उपयोग करके क्रॉस-लिंगुअल एंटिटी मैपिंग।",
    wikiIntegTitle: "विकिपीडिया एकीकरण",
    wikiIntegDesc: "एआई पर निर्भर हुए बिना सीधे विकिपीडिया रेस्ट एपीआई के माध्यम से तथ्यात्मक विश्वकोश अर्क खींचना।",
    scanner: { initializing: "शुरू कर रहा है...", loadingModel: "तैयार हो रहा है...", pointCamera: "यहाँ इंगित करें", switchCamera: "कैमरा बदलें", scanButton: "स्कैन करें", stopCamera: "रोकें", modeCamera: "कैमरा", modeUpload: "अपलोड", selectImage: "छवि चुनें" },
    results: { analyzing: "विश्लेषण...", contactingDb: "डेटाबेस से संपर्क...", confidence: "विश्वास स्तर", originalLabel: "मूल लेबल", scanAnother: "दूसरा स्कैन करें", alternative: "विकल्प चुनें:", composition: "विकिपीडिया सारांश", chemicalsTitle: "सामग्री संरचना", hazard: "सुरक्षा नोट्स", funFact: "रोचक तथ्य" },
    profile: { devTitle: "डेवलपर प्रोफाइल", devSubtitle: "इस एप्लिकेशन के निर्माता को जानें", leadDev: "लीड डेवलपर", devDesc: "<b>बीना सरना इंफॉर्मेटिका विश्वविद्यालय</b> से सूचना प्रणाली के द्वितीय सेमेस्टर के छात्र।", campusTitle: "कैंपस प्रोफाइल", campusName: "बीना सरना इंफॉर्मेटिका विश्वविद्यालय", campusBranch: "चेंगकरेंग कैंपस (UBSI)", campusDesc: "BSI चेंगकरेंग पश्चिमी जकार्ता में स्थित बीना सरना इंफॉर्मेटिका विश्वविद्यालय के परिसरों में से एक है।", address: "Jl. Kamal Raya No.18, पश्चिमी जकार्ता 11730", footerPowered: "MobileNet, Wikidata और Wikipedia REST API द्वारा संचालित।" }
  },
  ko: {
    appTitle: "스마트 객체 스캐너",
    appSubtitle: "카메라를 물체에 대면 화학 성분과 데이터를 즉시 분석합니다.",
    wikiGraphTitle: "위키데이터 지식 그래프",
    wikiGraphDesc: "언어에 관계없이 재료를 정확하게 식별하기 위한 위키데이터 기반의 다국어 엔티티 매핑.",
    wikiIntegTitle: "위키백과 통합",
    wikiIntegDesc: "불안정한 AI에 의존하지 않고 위키백과 REST API를 통해 사실적인 백과사전 요약을 직접 가져옵니다.",
    scanner: { initializing: "초기화 중...", loadingModel: "준비 중...", pointCamera: "여기에 맞추세요", switchCamera: "카메라 전환", scanButton: "스캔하기", stopCamera: "카메라 중지", modeCamera: "카메라", modeUpload: "업로드", selectImage: "이미지 선택" },
    results: { analyzing: "분석 중...", contactingDb: "데이터베이스 연결 중...", confidence: "신뢰도", originalLabel: "원본 레이블", scanAnother: "다른 물체 스캔", alternative: "대안을 선택하세요:", composition: "위키백과 요약", chemicalsTitle: "재료 구성", hazard: "안전 유의사항", funFact: "흥미로운 사실" },
    profile: { devTitle: "개발자 프로필", devSubtitle: "이 애플리케이션의 제작자에 대해 알아보세요", leadDev: "수석 개발자", devDesc: "<b>비나 사라나 인포마티카 대학교</b>의 정보 시스템 전공 2학기 학생입니다. 유용하고 혁신적인 솔루션을 만드는 데 전념하고 있습니다.", campusTitle: "캠퍼스 프로필", campusName: "비나 사라나 인포마티카 대학교", campusBranch: "쳉카렝 캠퍼스 (UBSI)", campusDesc: "BSI 쳉카렝은 서부 자카르타에 위치한 전략적인 캠퍼스 중 하나로, 정보 기술 및 비즈니스 분야의 수준 높은 교육에 중점을 두고 있습니다.", address: "Jl. Kamal Raya No.18, 서부 자카르타 11730", footerPowered: "MobileNet, Wikidata 및 위키백과 REST API 제공." }
  }
};
