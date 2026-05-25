import React, { useState } from 'react';
import Scanner from './components/Scanner';
import ProductInfo from './components/ProductInfo';
import { Database, ShieldCheck, Camera, Globe, MapPin, Building } from 'lucide-react';
import { i18n, languages } from './i18n';
import './index.css';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [lang, setLang] = useState('id');

  const t = i18n[lang];

  const handleScanResult = (result) => {
    setScanResult(result);
  };

  const handleReset = () => {
    setScanResult(null);
  };

  return (
    <div className="min-h-screen bg-background text-text-main font-sans">
      
      {/* Navbar */}
      <nav className="bg-surface border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 md:p-2 rounded-lg z-10 bg-white shadow-sm border border-gray-100 shrink-0">
              <Camera className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div className="marquee-container w-[110px] md:w-[180px]">
              <span className="text-lg md:text-2xl font-black tracking-widest uppercase rgb-marquee-title">
                JackScanner
              </span>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-1.5 rounded-full border border-gray-200">
            <Globe className="w-4 h-4 text-gray-500" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent border-none text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer outline-none appearance-none"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.name} ({l.code.toUpperCase()})</option>
              ))}
            </select>
          </div>
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
                  <h3 className="font-semibold text-text-main text-lg">Wikidata Knowledge Graph</h3>
                  <p className="text-sm text-text-muted mt-1 leading-relaxed">Cross-lingual entity mapping using Wikidata to accurately identify materials regardless of your language choice.</p>
                </div>
              </div>
              <div className="card p-5 flex items-start gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-main text-lg">Wikipedia Integration</h3>
                  <p className="text-sm text-text-muted mt-1 leading-relaxed">Pulling factual, reliable encyclopedia extracts directly via the Wikipedia REST API without relying on flaky AI text generators.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scanner / Result */}
          <div className="lg:col-span-7 order-1 lg:order-2">
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
            <h2 className="text-3xl font-extrabold text-text-main">Developer Profile</h2>
            <p className="text-text-muted mt-2 text-lg">Mengenal lebih dekat pembuat aplikasi ini</p>
          </div>
          
          <div className="max-w-4xl mx-auto card p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-white to-blue-50/50 shadow-xl border-primary/10">
            <div className="relative w-48 h-48 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
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
                <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">Lead Developer</span>
              </div>
              <p className="text-text-muted mt-4 leading-relaxed text-lg">
                Mahasiswa semester 2 di program studi <b>Sistem Informasi</b>, dari <b>Universitas Bina Sarana Informatika</b>. Berkomitmen untuk terus belajar dan menciptakan solusi teknologi yang bermanfaat dan inovatif.
              </p>
              
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-800 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <img src="https://www.google.com/s2/favicons?domain=fxcomunity.vercel.app&sz=64" alt="FX Comunity" className="w-5 h-5 rounded-full" />
                  FX Comunity
                </a>
                
                {/* Vallbot */}
                <a 
                  href="https://vallbot.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-800 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <img src="https://www.google.com/s2/favicons?domain=vallbot.vercel.app&sz=64" alt="Vallbot" className="w-5 h-5 rounded-full" />
                  Vallbot
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
          <div className="max-w-4xl mx-auto card p-8 md:p-10 flex flex-col items-center gap-6 bg-white shadow-xl border-primary/10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-lg bg-gray-50 flex items-center justify-center p-2">
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
                  Profil Kampus
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-text-main leading-tight">
                  Universitas Bina Sarana Informatika
                </h2>
                <h3 className="text-lg md:text-xl font-semibold text-primary mt-1">
                  Kampus Cengkareng (UBSI)
                </h3>
                <p className="text-text-muted mt-3 leading-relaxed">
                  BSI Cengkareng merupakan salah satu kampus Universitas Bina Sarana Informatika yang berlokasi strategis di Jakarta Barat. Berfokus pada pendidikan berkualitas di bidang Teknologi Informasi dan Bisnis dengan fasilitas penunjang untuk menciptakan generasi mandiri dan inovatif.
                </p>
                <div className="flex items-start gap-2 mt-4 text-sm text-gray-600">
                  <MapPin className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                  <span>Jl. Kamal Raya No.18, RT.6/RW.3, Cengkareng Bar., Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11730</span>
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
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-text-muted" />
            <span className="font-semibold text-text-main">JackScanner &copy; 2026</span>
          </div>
          <div className="text-sm text-text-muted">
            Powered by MobileNet, Wikidata, and Wikipedia REST API.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
