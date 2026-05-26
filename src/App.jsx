import React, { useState, useEffect } from 'react';
import Scanner from './components/Scanner';
import ProductInfo from './components/ProductInfo';
import CyberScanner from './components/CyberScanner';
import { Database, ShieldCheck, Camera, Globe, MapPin, Building, Moon, Sun, History, Trash2, ArrowRight, Search, Star, Terminal, Download, X } from 'lucide-react';
import { i18n, languages } from './i18n';
import './index.css';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [lang, setLang] = useState('id');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const [historySearch, setHistorySearch] = useState('');
  
  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPopup, setShowInstallPopup] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    
    const savedHistory = localStorage.getItem('scanHistory');
    if (savedHistory) {
      try {
        setScanHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error parsing history:', e);
      }
    }

    // PWA Prompt Listener
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Always show popup for UI demonstration if not dismissed
    const timer = setTimeout(() => {
      const hasDismissed = sessionStorage.getItem('dismissedInstallPopup');
      if (!hasDismissed) {
        setShowInstallPopup(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const dismissPopup = () => {
    setShowInstallPopup(false);
    sessionStorage.setItem('dismissedInstallPopup', 'true');
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User installed the PWA');
      }
      setDeferredPrompt(null);
    } else {
      alert("Browser Anda mungkin sudah menginstall aplikasi ini, atau silahkan gunakan menu browser (titik tiga) -> 'Tambahkan ke Layar Utama / Install App'.");
    }
    dismissPopup();
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const t = i18n[lang] || i18n['en'];

  const handleLanguageSelect = (code) => {
    setLang(code);
    setIsLangOpen(false);
    
    // Map code to Google Translate format if needed
    const gtCode = code === 'zh' ? 'zh-CN' : code;
    
    // Trigger Google Translate widget dynamically without reload
    const selectEl = document.querySelector('.goog-te-combo');
    if (selectEl) {
      selectEl.value = gtCode;
      selectEl.dispatchEvent(new Event('change'));
    }
  };

  const handleScanResult = (result) => {
    setScanResult(result);
    // Add to history
    if (Array.isArray(result) && result.length > 0) {
      const topName = result[0].className;
      const historyItem = { name: topName, data: result, date: new Date().toISOString() };
      const newHistory = [
        historyItem,
        ...scanHistory.filter(h => h.name !== topName)
      ].slice(0, 10); // Keep last 10
      setScanHistory(newHistory);
      localStorage.setItem('scanHistory', JSON.stringify(newHistory));
    } else if (result && result.name) {
      // Fallback for legacy format
      const newHistory = [
        { ...result, date: new Date().toISOString() },
        ...scanHistory.filter(h => h.name !== result.name)
      ].slice(0, 10);
      setScanHistory(newHistory);
      localStorage.setItem('scanHistory', JSON.stringify(newHistory));
    }
  };

  const clearHistory = () => {
    const favorites = scanHistory.filter(h => h.isFavorite);
    setScanHistory(favorites);
    if (favorites.length > 0) {
      localStorage.setItem('scanHistory', JSON.stringify(favorites));
    } else {
      localStorage.removeItem('scanHistory');
    }
  };

  const toggleFavorite = (e, idx) => {
    e.stopPropagation();
    const newHistory = [...scanHistory];
    newHistory[idx].isFavorite = !newHistory[idx].isFavorite;
    setScanHistory(newHistory);
    localStorage.setItem('scanHistory', JSON.stringify(newHistory));
  };

  const handleHistoryItemClick = (item) => {
    setScanResult(item.data || item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setScanResult(null);
  };

  return (
    <div className="min-h-screen bg-background text-text-main font-sans transition-colors duration-300">
      
      {/* Navbar */}
      <nav className="bg-surface border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-full.png" alt="JackScanner Logo" className="h-10 sm:h-12 object-contain" />
          </div>
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-text-muted" />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Context / Info */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in-up order-2 lg:order-1">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-text-main mb-6 leading-tight">
                {t.appTitle}
              </h1>
              <p className="text-lg text-text-muted leading-relaxed">
                {t.appSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="card p-5 flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-primary rounded-xl shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-main text-lg">{t.wikiGraphTitle || "Wikidata Knowledge Graph"}</h3>
                  <p className="text-sm text-text-muted mt-1 leading-relaxed">{t.wikiGraphDesc || "Cross-lingual entity mapping using Wikidata to accurately identify materials regardless of your language choice."}</p>
                </div>
              </div>
              <div className="card p-5 flex items-start gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-main text-lg">{t.wikiIntegTitle || "Wikipedia Integration"}</h3>
                  <p className="text-sm text-text-muted mt-1 leading-relaxed">{t.wikiIntegDesc || "Pulling factual, reliable encyclopedia extracts directly via the Wikipedia REST API without relying on flaky AI text generators."}</p>
                </div>
              </div>
            </div>

            {/* Scan History Section - Moved to Left Column */}
            <div className="card p-6 mt-8 tour-history">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  {t.historyTitle || "Riwayat Scan"}
                </h3>
                {scanHistory.length > 0 && (
                  <button onClick={clearHistory} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1">
                    <Trash2 className="w-4 h-4" /> {t.clearHistory || "Hapus"}
                  </button>
                )}
              </div>
              
              {scanHistory.length > 0 && (
                <div className="mb-4 relative">
                  <input 
                    type="text" 
                    placeholder="Cari riwayat..." 
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:border-primary text-sm"
                  />
                  <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
                </div>
              )}

              {scanHistory.length === 0 ? (
                <div className="text-center py-6 bg-background rounded-lg border border-dashed border-border">
                  <p className="text-text-muted text-sm">Belum ada riwayat. Yuk coba scan barang di sekitarmu!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {scanHistory
                    .map((item, originalIndex) => ({ item, originalIndex }))
                    .filter(({ item }) => item.name.toLowerCase().includes(historySearch.toLowerCase()))
                    .map(({ item, originalIndex }) => (
                    <div 
                      key={originalIndex} 
                      onClick={() => handleHistoryItemClick(item)}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-background cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => toggleFavorite(e, originalIndex)}
                          className="p-1 -ml-1 focus:outline-none"
                          title={item.isFavorite ? "Hapus dari Favorit" : "Tambahkan ke Favorit"}
                        >
                          <Star className={`w-5 h-5 transition-colors ${item.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`} />
                        </button>
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded bg-gray-200 dark:bg-gray-700" />
                        )}
                        <span className="font-semibold text-text-main capitalize">{item.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-muted" />
                    </div>
                  ))}
                  
                  {scanHistory.length > 0 && scanHistory.filter(item => item.name.toLowerCase().includes(historySearch.toLowerCase())).length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-text-muted text-sm">Tidak ada hasil yang cocok.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Scanner / Result */}
          <div className="lg:col-span-7 order-1 lg:order-2 tour-scanner">
            {!scanResult ? (
              <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <Scanner onScanResult={handleScanResult} lang={lang} />
              </div>
            ) : (
              <ProductInfo result={scanResult} onReset={handleReset} lang={lang} />
            )}
          </div>
          
        </div>
        
        {/* Developer Profile Section (Company Profile Style) */}
        <div className="mt-20 pt-16 border-t border-border animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-text-main">{t.profile?.devTitle || "Developer Profile"}</h2>
            <p className="text-text-muted mt-2 text-lg">{t.profile?.devSubtitle || "Mengenal lebih dekat pembuat aplikasi ini"}</p>
          </div>
          
          <div className="max-w-4xl mx-auto card p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-surface to-blue-50/50 dark:to-blue-900/20 shadow-xl border-primary/10">
            <div className="relative w-48 h-48 rounded-full overflow-hidden shrink-0 border-4 border-surface shadow-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <img 
                src="/profile.jpg" 
                alt="Developer Profile" 
                className="w-full h-full object-cover scale-[1.2]" 
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Jack&background=0D8ABC&color=fff&size=300'; }} 
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
                <h3 className="font-bold text-text-main text-3xl">si.palingjack</h3>
                <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">{t.profile?.leadDev || "Lead Developer"}</span>
              </div>
              <p className="text-text-muted mt-4 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: t.profile?.devDesc || "Mahasiswa semester 2 di program studi <b>Sistem Informasi</b>, dari <b>Universitas Bina Sarana Informatika</b>. Berkomitmen untuk terus belajar dan menciptakan solusi teknologi yang bermanfaat dan inovatif." }} />
              
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
                <a 
                  href="https://api.whatsapp.com/send/?phone=62895404147521&text&type=phone_number&app_absent=0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-sm font-bold rounded-xl hover:bg-[#1DA851] transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  WhatsApp
                </a>

                {/* FX Comunity */}
                <a 
                  href="https://fxcomunity.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface border border-border text-text-main text-sm font-bold rounded-xl hover:bg-background transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <img src="https://www.google.com/s2/favicons?domain=fxcomunity.vercel.app&sz=64" alt="FX Comunity" className="w-5 h-5 rounded-full" />
                  FX Comunity
                </a>
                
                {/* Vallbot */}
                <a 
                  href="https://vallbot.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface border border-border text-text-main text-sm font-bold rounded-xl hover:bg-background transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <img src="https://www.google.com/s2/favicons?domain=vallbot.vercel.app&sz=64" alt="Vallbot" className="w-5 h-5 rounded-full" />
                  Vallbot
                </a>
                
                {/* Website Profile */}
                <a 
                  href="https://fxcomunity.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface border border-border text-text-main text-sm font-bold rounded-xl hover:bg-background transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <Globe className="w-5 h-5 text-blue-500" />
                  Website Profile
                </a>
                
                {/* GitHub */}
                <a 
                  href="https://github.com/fxcomunity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#24292F] text-white text-sm font-bold rounded-xl hover:bg-[#1b1f23] transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* UBSI Profile Section */}
        <div className="mt-10">
          <div className="max-w-4xl mx-auto card p-8 md:p-10 flex flex-col items-center gap-6 bg-surface shadow-xl border-primary/10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border-4 border-surface shadow-lg bg-background flex items-center justify-center p-2">
                <img 
                  src="/logo-ubsi.png" 
                  alt="Logo UBSI" 
                  className="w-full h-full object-contain" 
                  onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=UBSI&background=0D8ABC&color=fff&size=300'; }} 
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-3">
                  <Building className="w-4 h-4" />
                  {t.profile?.campusTitle || "Profil Kampus"}
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-text-main leading-tight">
                  {t.profile?.campusName || "Universitas Bina Sarana Informatika"}
                </h2>
                <h3 className="text-lg md:text-xl font-semibold text-primary mt-1">
                  {t.profile?.campusBranch || "Kampus Cengkareng (UBSI)"}
                </h3>
                <p className="text-text-muted mt-3 leading-relaxed">
                  {t.profile?.campusDesc || "BSI Cengkareng merupakan salah satu kampus Universitas Bina Sarana Informatika yang berlokasi strategis di Jakarta Barat. Berfokus pada pendidikan berkualitas di bidang Teknologi Informasi dan Bisnis dengan fasilitas penunjang untuk menciptakan generasi mandiri dan inovatif."}
                </p>
                <div className="flex items-start gap-2 mt-4 text-sm text-text-muted">
                  <MapPin className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                  <span>{t.profile?.address || "Jl. Kamal Raya No.18, RT.6/RW.3, Cengkareng Bar., Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11730"}</span>
                </div>
              </div>
            </div>
            
            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-inner border border-gray-200 mt-4">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://maps.google.com/maps?q=Universitas%20Bina%20Sarana%20Informatika%20Kampus%20Cengkareng&t=&z=16&ie=UTF8&iwloc=&output=embed"
                title="Peta UBSI Cengkareng"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Cyber Recon Section */}
        <div className="mt-10" id="cyber-recon">
          <div className="max-w-5xl mx-auto card p-6 md:p-10 bg-[#020617] text-green-400 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white flex justify-center items-center gap-3 tracking-wider">
                <Terminal className="w-8 h-8 text-green-500" />
                CYBER RECON SCANNER
              </h2>
              <p className="text-green-500/70 mt-2 font-mono">Passive recon, vulnerability check & URL malware detection</p>
            </div>
            
            <CyberScanner />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-text-muted" />
            <span className="font-semibold text-text-main">JackScanner &copy; 2026</span>
          </div>
          <div className="text-sm text-text-muted text-center md:text-right flex flex-col items-center md:items-end">
            <p>Developer By <a href="https://wa.me/62895404147521" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Jack</a></p>
            <p className="mt-2 text-xs font-semibold text-text-main">Assisted by Artificial Intelligence:</p>
            <div className="text-xs mt-1 space-y-0.5 text-center md:text-right">
              <p>1. Gemini AI</p>
              <p>2. Open AI</p>
              <p>3. DeepSeek AI</p>
              <p>4. Mistral AI</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden"></div>

      {/* Floating Buttons: WhatsApp & Google Translate */}
      <div className="fixed bottom-10 right-4 md:right-10 z-[100] flex flex-col items-end">
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/62895404147521" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-pop-in mb-4 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative group"
          style={{ boxShadow: '0 10px 25px -5px rgba(37, 211, 102, 0.4)' }}
          title="Chat WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
          
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center z-10">
            <span className="whatsapp-badge-pulse absolute inline-flex rounded-full h-[22px] w-[22px] bg-[#FF3B30] text-white text-[13px] font-[800] items-center justify-center border-[2.5px] border-white shadow-sm font-sans leading-none">
              1
            </span>
          </span>
        </a>

        {isLangOpen && (
          <div className="mb-4 bg-surface rounded-2xl shadow-2xl border border-border p-2 animate-fade-in-up max-h-[60vh] overflow-y-auto w-56 transform origin-bottom-right">
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 border-b border-gray-100">
              Google Terjemahan
            </div>
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => handleLanguageSelect(l.code)}
                className={`w-full text-left px-3 py-2.5 text-sm flex items-center gap-3 hover:bg-blue-50 rounded-xl transition-all ${lang === l.code ? 'bg-blue-50/80 text-blue-600 font-bold' : 'text-gray-700 font-medium'}`}
              >
                <img src={`https://flagcdn.com/w20/${l.country}.png`} alt={l.name} className="w-5 h-auto rounded-sm shadow-sm" />
                {l.name}
              </button>
            ))}
          </div>
        )}
        
        <button 
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="tour-lang w-14 h-14 bg-surface rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-border group relative overflow-hidden"
          style={{ boxShadow: '0 10px 25px -5px rgba(66, 133, 244, 0.4)' }}
        >
          <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg" 
            alt="Google Translate" 
            className="w-8 h-8 relative z-10"
          />
        </button>
      </div>

      {/* PWA Custom Install Popup */}
      {showInstallPopup && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gray-900 border border-green-500/30 text-white p-4 rounded-xl shadow-2xl z-50 animate-fade-in-up">
          <button 
            onClick={dismissPopup}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex gap-4 items-start">
            <div className="bg-green-500/20 p-3 rounded-xl shrink-0">
              <Download className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">Install JackScanner App</h4>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Tambahkan aplikasi ini ke layar utama HP Anda agar bisa diakses lebih cepat, *offline*, dan tanpa *browser*!
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={handleInstallClick}
                  className="bg-green-600 hover:bg-green-500 text-black font-bold py-2 px-4 rounded-lg flex-1 transition-colors"
                >
                  Install Sekarang
                </button>
                <button 
                  onClick={dismissPopup}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Nanti Saja
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 p-10 flex flex-col items-center justify-center font-mono">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Aplikasi Mengalami Crash</h1>
          <p className="text-red-800 mb-4">Berikut adalah pesan error-nya:</p>
          <pre className="bg-red-100 p-4 rounded-lg text-red-900 w-full max-w-4xl overflow-x-auto">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-8 px-6 py-2 bg-red-600 text-white rounded-lg font-bold"
          >
            Muat Ulang Halaman
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
