import React, { useState, useEffect, useRef } from "react";
import { Beaker, AlertTriangle, RefreshCcw, BrainCircuit, Box, MousePointerClick, Loader2, Search, Volume2, VolumeX, Download, Share2, ShoppingBag, ShoppingCart } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getChemicalInfoFromAI } from "../aiService";
import { i18n } from "../i18n";

const ProductInfo = ({ result, onReset, lang, onUpdateInfo }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [customLabel, setCustomLabel] = useState("");
  const [activeLabel, setActiveLabel] = useState(""); // If set, use this instead of camera prediction
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef(null);
  
  const selectedPrediction = result[selectedIndex];
  const confidencePercent = (selectedPrediction.probability * 100).toFixed(1);
  const t = i18n[lang].results;

  useEffect(() => {
    let isMounted = true;
    const labelToFetch = activeLabel || selectedPrediction.className;
    
    const fetchInfo = async () => {
      setIsLoading(true);
      const data = await getChemicalInfoFromAI(labelToFetch, lang);
      if (isMounted) {
        setInfo(data);
        setIsLoading(false);
        if (onUpdateInfo) {
          onUpdateInfo(labelToFetch, data);
        }
      }
    };
    
    fetchInfo();
    
    return () => { 
      isMounted = false; 
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [selectedPrediction.className, activeLabel, lang]);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customLabel.trim()) {
      setActiveLabel(customLabel.trim());
    }
  };

  const handlePredictionClick = (idx) => {
    setActiveLabel(""); // Reset custom label
    setCustomLabel("");
    setSelectedIndex(idx);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const textToRead = `${info.name}. ${t.composition}: ${info.composition}. ${t.hazard}: ${info.hazard}.`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } else {
      alert("Browser Anda tidak mendukung fitur suara.");
    }
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`JackScanner-${info.name.replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      console.error("Gagal mendownload PDF:", err);
      alert("Gagal membuat PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareWA = () => {
    const appUrl = window.location.href;
    const text = `🔍 *Hasil Scan: ${info.name}*\n\n📋 *Komposisi Utama:*\n${info.composition}\n\n⚠️ *Catatan Bahaya:*\n${info.hazard}\n\n💡 *Fakta Menarik:*\n${info.funFact}\n\n---\n📸 _Di-scan cerdas menggunakan JackScanner_\n🌐 Coba aplikasinya gratis di: ${appUrl}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const handleSearchShopee = () => {
    const query = encodeURIComponent(info.name);
    window.open(`https://shopee.co.id/search?keyword=${query}`, '_blank');
  };

  const handleSearchTokopedia = () => {
    const query = encodeURIComponent(info.name);
    window.open(`https://www.tokopedia.com/search?q=${query}`, '_blank');
  };

  if (isLoading || !info) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Skeleton Header */}
        <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-gray-300 dark:border-gray-700 bg-surface">
          <div className="space-y-3 w-full sm:w-1/2">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            <div className="flex items-center gap-3">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="w-9 h-9 bg-gray-200 dark:bg-gray-800 rounded-full shrink-0"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <div className="w-24 h-10 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="w-24 h-10 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="w-24 h-10 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>
        </div>

        {/* Skeleton Manual Override */}
        <div className="card p-4 bg-background border border-border space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 md:w-1/3 mb-2"></div>
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            <div className="w-20 h-10 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
          </div>
        </div>

        {/* Skeleton Composition Overview */}
        <div className="card p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="bg-surface p-4 rounded-xl border border-border space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
          </div>
        </div>

        {/* Skeleton Chemical Breakdown */}
        <div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4 px-1"></div>
          <div className="grid grid-cols-1 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="card p-4 flex flex-col sm:flex-row gap-4 bg-surface">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0"></div>
                <div className="space-y-3 w-full flex-1 pt-1">
                  <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Indicator Overlay */}
        <div className="text-center pt-2 pb-6 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
          <p className="text-text-muted text-sm font-medium animate-pulse">
            {t.contactingDb} "<span className="font-mono text-primary font-bold">{activeLabel || selectedPrediction.className}</span>"...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up" ref={printRef}>
      {/* Result Header */}
      <div className="card p-6 flex flex-col gap-6 border-l-4 border-l-primary bg-surface">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
          {result[0]?.image && (
            <div className="w-full sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden border-2 border-border shadow-sm bg-background relative group">
              <img src={result[0].image} alt="Scanned object" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" /> 
              {activeLabel ? "Manual Input (User)" : `${t.confidence}: ${confidencePercent}%`}
            </p>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-main capitalize leading-tight">{info.name}</h2>
              <button 
                onClick={handleSpeak}
                className={`p-2 shrink-0 rounded-full transition-colors ${isPlaying ? 'bg-primary text-white shadow-md animate-pulse' : 'bg-background text-text-muted hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                title="Bacakan Info"
              >
                {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-text-muted text-sm mt-2">
              {t.originalLabel}: <span className="font-mono text-xs bg-background px-2 py-0.5 rounded border border-border text-text-muted">{activeLabel || selectedPrediction.className}</span>
            </p>
          </div>
        </div>
        
        {/* Action Buttons Container */}
        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4" data-html2canvas-ignore>
          <button onClick={handleSearchShopee} className="btn-secondary whitespace-nowrap !bg-orange-50 !text-orange-600 !border-orange-200 hover:!bg-orange-100 hover:!border-orange-300 dark:!bg-orange-900/30 dark:!text-orange-400 dark:!border-orange-800" title="Cari di Shopee">
            <ShoppingBag className="w-4 h-4" /> Shopee
          </button>
          <button onClick={handleSearchTokopedia} className="btn-secondary whitespace-nowrap !bg-green-50 !text-green-600 !border-green-200 hover:!bg-green-100 hover:!border-green-300 dark:!bg-green-900/30 dark:!text-green-400 dark:!border-green-800" title="Cari di Tokopedia">
            <ShoppingCart className="w-4 h-4" /> Tokopedia
          </button>
          <button onClick={handleShareWA} className="btn-secondary whitespace-nowrap !bg-teal-50 !text-teal-700 !border-teal-200 hover:!bg-teal-100 hover:!border-teal-300 dark:!bg-teal-900/30 dark:!text-teal-400 dark:!border-teal-800">
            <Share2 className="w-4 h-4" /> Share WA
          </button>
          <button onClick={handleDownloadPDF} disabled={isDownloading} className="btn-secondary whitespace-nowrap !bg-blue-50 !text-blue-700 !border-blue-200 hover:!bg-blue-100 hover:!border-blue-300 dark:!bg-blue-900/30 dark:!text-blue-400 dark:!border-blue-800 disabled:opacity-50">
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Unduh PDF
          </button>
          <button onClick={onReset} className="btn-secondary whitespace-nowrap">
            <RefreshCcw className="w-4 h-4" /> {t.scanAnother}
          </button>
        </div>
      </div>

      {/* Manual Override & Alternative Predictions */}
      <div className="card p-4 bg-background border border-border space-y-4" data-html2canvas-ignore>
        
        {/* Manual Input Form */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" /> 
            {lang === 'id' ? "Kamera salah tebak? Ketik nama benda di sini:" : "Camera wrong? Type the object name here:"}
          </h4>
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input 
              type="text" 
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder={lang === 'id' ? "Contoh: Botol Minum Plastik" : "e.g. Plastic Water Bottle"}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
            />
            <button type="submit" className="btn-primary py-2 px-4 text-sm whitespace-nowrap">
              {lang === 'id' ? "Cari" : "Search"}
            </button>
          </form>
        </div>

        {/* AI Alternatives */}
        {result.length > 1 && (
          <div className="pt-2 border-t border-gray-200">
            <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
              {t.alternative}
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.map((pred, idx) => (
                <button 
                  key={idx}
                  onClick={() => handlePredictionClick(idx)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    selectedIndex === idx && !activeLabel
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-surface text-text-muted border border-border hover:bg-background'
                  }`}
                >
                  {pred.className} ({(pred.probability * 100).toFixed(0)}%)
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Composition Overview */}
      <div className="card p-6 bg-blue-50/50">
        <h3 className="font-semibold text-text-main flex items-center gap-2 mb-3">
          <Box className="w-5 h-5 text-primary" /> {t.composition}
        </h3>
        <p className="text-text-muted leading-relaxed bg-surface p-4 rounded-xl border border-border whitespace-pre-wrap">
          {info.composition}
        </p>
      </div>

      {/* Chemical Breakdown */}
      <div>
        <h3 className="font-semibold text-text-main flex items-center gap-2 mb-4 px-1">
          <Beaker className="w-5 h-5 text-primary" /> {t.chemicalsTitle}
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {info.chemicals.map((chem, idx) => (
            <div key={idx} className="card p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 bg-surface">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Beaker className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-text-main capitalize">{chem.name}</h4>
                <p className="text-sm text-text-muted mt-1 leading-relaxed">{chem.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hazard Warning */}
      <div className="card p-6 border border-yellow-200 bg-yellow-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
        <div className="flex gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-yellow-800 mb-1">{t.hazard}</h4>
            <p className="text-sm text-yellow-700 font-medium leading-relaxed">{info.hazard}</p>
            <p className="text-xs text-yellow-600 mt-2 italic flex items-center gap-1">✨ {t.funFact}: {info.funFact}</p>
          </div>
        </div>
      </div>
      
      {/* Price Estimate & E-Commerce */}
      {info.priceEstimate && info.priceEstimate !== "-" && (
        <div className="card p-6 border border-green-200 bg-green-50 relative overflow-hidden mt-6" data-html2canvas-ignore>
          <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-8 h-8 text-green-700 shrink-0 font-bold text-sm rounded-full bg-green-200 flex items-center justify-center">Rp</div>
              <div>
                <h4 className="text-sm font-bold text-green-800 mb-1">{lang === 'id' ? 'Estimasi Harga Pasaran' : 'Estimated Market Price'}</h4>
                <p className="text-sm text-green-700 font-medium leading-relaxed">{info.priceEstimate}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`https://www.tokopedia.com/search?q=${encodeURIComponent(info.name)}`} target="_blank" rel="noreferrer" className="text-xs font-bold px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm">Cari di Tokopedia</a>
              <a href={`https://shopee.co.id/search?keyword=${encodeURIComponent(info.name)}`} target="_blank" rel="noreferrer" className="text-xs font-bold px-4 py-2 bg-[#ee4d2d] text-white rounded-lg hover:bg-[#d73211] transition-colors shadow-sm">Cari di Shopee</a>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ProductInfo;
