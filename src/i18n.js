export const languages = [
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' }
];

export const i18n = {
  id: {
    appTitle: "Pemindai Barang Pintar",
    appSubtitle: "Arahkan kamera ke benda apapun untuk membedah komposisi kimia & ensiklopedianya secara instan.",
    scanner: {
      initializing: "Mempersiapkan Kamera...",
      loadingModel: "Mengunduh Model AI...",
      pointCamera: "Arahkan Benda ke Sini",
      switchCamera: "Ganti Kamera",
      scanButton: "Pindai Benda Sekarang",
      stopCamera: "Matikan Kamera",
      modeCamera: "Kamera",
      modeUpload: "Unggah Foto",
      selectImage: "Pilih Gambar"
    },
    results: {
      analyzing: "Menganalisis Material...",
      contactingDb: "Menghubungi Database Global...",
      confidence: "Tingkat Keyakinan",
      originalLabel: "Label Asli",
      scanAnother: "Pindai Benda Lain",
      alternative: "AI salah tebak? Pilih kemungkinan lain:",
      composition: "Ringkasan Wikipedia",
      chemicalsTitle: "Kandungan Material",
      hazard: "Catatan Keamanan",
      funFact: "Fakta Ekstra"
    }
  },
  en: {
    appTitle: "Smart Object Scanner",
    appSubtitle: "Point the camera at any object to instantly dissect its chemical composition & encyclopedia data.",
    scanner: {
      initializing: "Initializing Camera...",
      loadingModel: "Loading AI Model...",
      pointCamera: "Point Object Here",
      switchCamera: "Switch Camera",
      scanButton: "Scan Object Now",
      stopCamera: "Stop Camera",
      modeCamera: "Camera",
      modeUpload: "Upload Photo",
      selectImage: "Select Image"
    },
    results: {
      analyzing: "Analyzing Materials...",
      contactingDb: "Contacting Global Database...",
      confidence: "Confidence Level",
      originalLabel: "Original Label",
      scanAnother: "Scan Another Object",
      alternative: "Wrong guess? Pick an alternative:",
      composition: "Wikipedia Summary",
      chemicalsTitle: "Material Composition",
      hazard: "Safety Notes",
      funFact: "Extra Fact"
    }
  },
  es: {
    appTitle: "Escáner de Objetos Inteligente",
    appSubtitle: "Apunta la cámara a cualquier objeto para diseccionar al instante su composición química.",
    scanner: {
      initializing: "Iniciando Cámara...",
      loadingModel: "Cargando Modelo de IA...",
      pointCamera: "Apunta el Objeto Aquí",
      switchCamera: "Cambiar Cámara",
      scanButton: "Escanear Objeto Ahora",
      stopCamera: "Detener Cámara",
      modeCamera: "Cámara",
      modeUpload: "Subir Foto",
      selectImage: "Seleccionar Imagen"
    },
    results: {
      analyzing: "Analizando Materiales...",
      contactingDb: "Contactando Base de Datos...",
      confidence: "Nivel de Confianza",
      originalLabel: "Etiqueta Original",
      scanAnother: "Escanear Otro Objeto",
      alternative: "¿Suposición incorrecta? Elige alternativa:",
      composition: "Resumen de Wikipedia",
      chemicalsTitle: "Composición del Material",
      hazard: "Notas de Seguridad",
      funFact: "Dato Curioso"
    }
  },
  fr: {
    appTitle: "Scanner d'Objets Intelligent",
    appSubtitle: "Pointez la caméra sur n'importe quel objet pour disséquer sa composition chimique.",
    scanner: {
      initializing: "Initialisation de la Caméra...",
      loadingModel: "Chargement du Modèle IA...",
      pointCamera: "Pointez l'Objet Ici",
      switchCamera: "Changer de Caméra",
      scanButton: "Scanner l'Objet",
      stopCamera: "Arrêter la Caméra",
      modeCamera: "Caméra",
      modeUpload: "Téléverser Photo",
      selectImage: "Sélectionner Image"
    },
    results: {
      analyzing: "Analyse des Matériaux...",
      contactingDb: "Contact Base de Données...",
      confidence: "Niveau de Confiance",
      originalLabel: "Étiquette Originale",
      scanAnother: "Scanner un Autre Objet",
      alternative: "Mauvaise déduction ? Choisissez:",
      composition: "Résumé Wikipédia",
      chemicalsTitle: "Composition des Matériaux",
      hazard: "Notes de Sécurité",
      funFact: "Fait Amusant"
    }
  },
  de: {
    appTitle: "Intelligenter Objekt-Scanner",
    appSubtitle: "Richten Sie die Kamera auf ein beliebiges Objekt, um seine chemische Zusammensetzung zu analysieren.",
    scanner: {
      initializing: "Kamera Initialisieren...",
      loadingModel: "Lade KI-Modell...",
      pointCamera: "Objekt Hierhin Richten",
      switchCamera: "Kamera Wechseln",
      scanButton: "Objekt Jetzt Scannen",
      stopCamera: "Kamera Stoppen",
      modeCamera: "Kamera",
      modeUpload: "Foto Hochladen",
      selectImage: "Bild Auswählen"
    },
    results: {
      analyzing: "Materialien Analysieren...",
      contactingDb: "Globale Datenbank wird kontaktiert...",
      confidence: "Konfidenzniveau",
      originalLabel: "Originaletikett",
      scanAnother: "Anderes Objekt Scannen",
      alternative: "Falsch geraten? Wähle eine Alternative:",
      composition: "Wikipedia-Zusammenfassung",
      chemicalsTitle: "Materialzusammensetzung",
      hazard: "Sicherheitshinweise",
      funFact: "Zusätzlicher Fakt"
    }
  },
  ja: {
    appTitle: "スマートオブジェクトスキャナー",
    appSubtitle: "カメラを任意のオブジェクトに向けて、その化学組成と百科事典データを即座に分析します。",
    scanner: {
      initializing: "カメラを初期化中...",
      loadingModel: "AIモデルを読み込み中...",
      pointCamera: "ここにオブジェクトを向ける",
      switchCamera: "カメラを切り替える",
      scanButton: "今すぐオブジェクトをスキャン",
      stopCamera: "カメラを停止する",
      modeCamera: "カメラ",
      modeUpload: "写真をアップロード",
      selectImage: "画像を選択"
    },
    results: {
      analyzing: "材料を分析中...",
      contactingDb: "グローバルデータベースに接続中...",
      confidence: "信頼度レベル",
      originalLabel: "元のラベル",
      scanAnother: "別のオブジェクトをスキャン",
      alternative: "推測が間違っていますか？代替を選択してください:",
      composition: "Wikipediaの概要",
      chemicalsTitle: "材料組成",
      hazard: "安全上の注意事項",
      funFact: "豆知識"
    }
  }
};
