import React, { useState, useEffect } from "react";
import { Beaker, AlertTriangle, RefreshCcw, BrainCircuit, Box, MousePointerClick, Loader2, Search } from "lucide-react";
import { getChemicalInfoFromAI } from "../aiService";
import { i18n } from "../i18n";

const ProductInfo = ({ result, onReset, lang }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [customLabel, setCustomLabel] = useState("");
  const [activeLabel, setActiveLabel] = useState(""); // If set, use this instead of camera prediction
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
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
      }
    };
    
    fetchInfo();
    
    return () => { isMounted = false; };
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

  if (isLoading || !info) {
    return (
      <div className="card p-12 flex flex-col items-center justify-center bg-white space-y-4 animate-fade-in-up border-2 border-primary/20">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <h3 className="text-xl font-bold text-text-main">{t.analyzing}</h3>
        <p className="text-text-muted text-center max-w-sm text-sm">
          {t.contactingDb} "<span className="font-mono text-primary font-bold">{activeLabel || selectedPrediction.className}</span>".
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Result Header */}
      <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-primary bg-white">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" /> 
            {activeLabel ? "Manual Input (User)" : `${t.confidence}: ${confidencePercent}%`}
          </p>
          <h2 className="text-2xl font-bold text-text-main capitalize">{info.name}</h2>
          <p className="text-text-muted text-sm mt-1">
            {t.originalLabel}: <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{activeLabel || selectedPrediction.className}</span>
          </p>
        </div>
        <button onClick={onReset} className="btn-secondary whitespace-nowrap shrink-0">
          <RefreshCcw className="w-4 h-4" /> {t.scanAnother}
        </button>
      </div>

      {/* Manual Override & Alternative Predictions */}
      <div className="card p-4 bg-gray-50 border border-gray-200 space-y-4">
        
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
                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
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
        <p className="text-text-muted leading-relaxed bg-white p-4 rounded-xl border border-border whitespace-pre-wrap">
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
            <div key={idx} className="card p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 bg-white">
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
      
    </div>
  );
};

export default ProductInfo;
