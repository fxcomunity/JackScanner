import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { ScanLine, Loader2, CameraOff, Camera, Upload, Image as ImageIcon, Smartphone, Monitor, Barcode, Wand2, FileText } from 'lucide-react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { i18n } from '../i18n';
import { playBeep, playShutter } from '../utils/audio';

const Scanner = ({ onScanResult, lang, onUrlDetected, onTextExtracted }) => {
  const webcamRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false);
  const [scanMode, setScanMode] = useState('camera'); // 'camera', 'barcode', 'text'
  const [inputMethod, setInputMethod] = useState('camera'); // 'camera' or 'upload'
  const [imageSrc, setImageSrc] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [barcodeError, setBarcodeError] = useState("");
  const [isFlashing, setIsFlashing] = useState(false);
  const [errorPopup, setErrorPopup] = useState(null);

  const t = i18n[lang].scanner;

  const callGeminiWithFallback = async (prompt, mimeType = null, base64Data = null) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key belum disetting di .env!");

    const parts = [{ text: prompt }];
    if (mimeType && base64Data) {
      parts.push({ inlineData: { mimeType, data: base64Data } });
    }

    const body = JSON.stringify({ contents: [{ parts }] });
    
    let res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body
    });
    
    if (!res.ok && (res.status === 503 || res.status === 429)) {
        console.warn(`Gemini 2.5 Flash sibuk (${res.status}), mencoba model cadangan gemini-1.5-flash...`);
        res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body
        });
    }
    
    if (!res.ok) {
        const errorText = await res.text();
        let parsedError = errorText;
        try {
            const jsonErr = JSON.parse(errorText);
            if (jsonErr.error && jsonErr.error.message) {
                parsedError = jsonErr.error.message;
            }
        } catch (e) {}
        
        if (res.status === 503 || res.status === 429) {
            throw new Error("Server AI sedang terlalu sibuk (Overloaded). Silakan coba lagi dalam beberapa detik.");
        }
        throw new Error(parsedError);
    }
    
    return await res.json();
  };

  const handleBarcodeDetected = async (text) => {
    playBeep();
    
    // Check if it's a URL/QR Code
    if (text.startsWith('http://') || text.startsWith('https://') || text.includes('.com') || text.includes('.net') || text.includes('.org') || text.includes('.id')) {
      if (onUrlDetected) {
        onUrlDetected(text);
        return;
      }
    }

    setIsScanning(true);
    try {
      const prompt = `I scanned a product barcode: "${text}". Identify the product brand and name associated with this barcode. Reply with ONLY 1 to 4 specific words describing the product in English. Do not include any other text. If you don't know, guess based on common barcode formats.`;
      const data = await callGeminiWithFallback(prompt);
      
      const detectedLabel = data.candidates[0].content.parts[0].text.trim().toLowerCase();
      if (detectedLabel) {
        onScanResult([{ className: detectedLabel, probability: 0.99 }]);
      }
    } catch (err) {
      console.error(err);
      setErrorPopup({
        title: "Gagal Menganalisis Barcode",
        message: err.message || "Gagal mengidentifikasi barcode via AI."
      });
    }
    setIsScanning(false);
  };

  useEffect(() => {
    if (scanMode === 'barcode') {
      // Check if browser supports camera API (requires HTTPS unless on localhost)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setBarcodeError("Kamera tidak dapat diakses. Pastikan Anda membuka web ini menggunakan HTTPS (atau localhost) dan mengizinkan akses kamera di pengaturan browser HP Anda.");
        return;
      }
      setBarcodeError("");

      const scanner = new Html5QrcodeScanner("reader", { 
        fps: 10, 
        qrbox: {width: 250, height: 150},
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA] 
      }, false);
      
      scanner.render((decodedText) => {
        scanner.clear();
        handleBarcodeDetected(decodedText);
      }, (error) => {
        // ignore continuous scanning errors
      });
      
      return () => {
        scanner.clear().catch(e => console.log(e));
      };
    }
  }, [scanMode]);

  // Removed handleAIBarcodeFallback as it will use the unified captureAndScan flow

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      playBeep();
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      playBeep();
      const reader = new FileReader();
      reader.onload = (event) => setImageSrc(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const captureAndScan = async () => {
    if (scanMode === 'camera' || scanMode === 'text') {
      playShutter();
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 150);
    } else {
      playBeep();
    }
    setIsScanning(true);
    try {
      const base64DataWithPrefix = (inputMethod === 'camera') 
        ? webcamRef.current.getScreenshot() 
        : imageSrc;

      if (!base64DataWithPrefix) {
        setIsScanning(false);
        return;
      }

      // Format for Gemini API (remove data:image/jpeg;base64, prefix)
      const mimeTypeMatch = base64DataWithPrefix.match(/^data:(.*?);base64,/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';
      const base64Data = base64DataWithPrefix.replace(/^data:.*?;base64,/, "");

      const isTextMode = scanMode === 'text';
      const prompt = isTextMode
        ? "Extract all text from this image accurately. Do not include any other commentary or markdown formatting. Just the raw text."
        : "Identify the product in this image. If there is a barcode, text, or brand label visible (even if blurry), read it to identify the specific brand and product name accurately. Reply with ONLY 1 to 4 specific words describing the product in English. Do not include any other text.";

      const data = await callGeminiWithFallback(prompt, mimeType, base64Data);
      
      if (isTextMode) {
        if (onTextExtracted) onTextExtracted(data.candidates[0].content.parts[0].text);
      } else {
        const detectedLabel = data.candidates[0].content.parts[0].text.trim().toLowerCase();
        // Mengirim hasil prediksi tunggal beserta gambar yang discan
        if (detectedLabel) {
          onScanResult([{ className: detectedLabel, probability: 0.99, image: base64DataWithPrefix }]);
        }
      }
    } catch (err) {
      console.error("Failed to scan image via Gemini Vision:", err);
      setErrorPopup({
        title: "Gagal Menganalisis Gambar",
        message: err.message || "Terjadi kesalahan saat memproses gambar."
      });
    }
    setIsScanning(false);
  };

  const resetUpload = () => {
    setImageSrc(null);
  };

  return (
    <div className="card p-6 overflow-hidden bg-surface">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-50 text-primary mb-3">
          <ScanLine className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-text-main">Smart Vision Scanner</h3>
        <p className="text-text-muted mt-2 text-sm">
          {t.pointCamera}
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex bg-background p-1 rounded-lg mb-6 max-w-md mx-auto border border-border">
        <button
          onClick={() => { setScanMode('camera'); setInputMethod('camera'); setImageSrc(null); }}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-all duration-200 ${scanMode === 'camera' ? 'bg-surface shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
        >
          <Camera className="w-4 h-4" /> <span className="hidden sm:inline">{t.modeCamera}</span>
        </button>
        <button
          onClick={() => { setScanMode('barcode'); setInputMethod('camera'); setImageSrc(null); }}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-all duration-200 ${scanMode === 'barcode' ? 'bg-surface shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
        >
          <Barcode className="w-4 h-4" /> <span className="hidden sm:inline">Barcode</span>
        </button>
        <button
          onClick={() => { setScanMode('text'); setInputMethod('camera'); setImageSrc(null); }}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-all duration-200 ${scanMode === 'text' ? 'bg-surface shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
        >
          <FileText className="w-4 h-4" /> <span className="hidden sm:inline">OCR</span>
        </button>
      </div>

      {/* Camera Mode */}
      {(scanMode === 'camera' || scanMode === 'text') && inputMethod === 'camera' && (
        <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-border bg-background flex flex-col items-center justify-center min-h-[300px] p-2">
          {!hasRequestedPermission || cameraError ? (
            <div className="flex flex-col items-center justify-center p-6 text-center w-full bg-surface rounded-xl">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm ${cameraError ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-blue-100 text-blue-500'}`}>
                {cameraError ? <CameraOff className="w-8 h-8" /> : <Camera className="w-8 h-8" />}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Akses Kamera Diperlukan</h3>
              <p className="text-gray-600 text-sm mb-6 max-w-sm">
                Aplikasi ini membutuhkan akses kamera untuk memindai barang. Ikuti panduan di bawah untuk mengizinkannya:
              </p>
              
              <div className="w-full space-y-3 max-w-md mx-auto">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-4 items-start text-left">
                  <Smartphone className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">Di HP (Mobile)</p>
                    <p className="text-xs text-gray-600 mt-1">Ketuk ikon gembok (🔒) di address bar, pilih <b>Izin (Permissions)</b>, lalu izinkan <b>Kamera</b>.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                {!hasRequestedPermission ? (
                  <button 
                    onClick={() => setHasRequestedPermission(true)} 
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" /> Izinkan Kamera
                  </button>
                ) : (
                  <button 
                    onClick={() => window.location.reload()} 
                    className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Loader2 className="w-4 h-4" /> Muat Ulang
                  </button>
                )}
                
                <button 
                  onClick={() => setInputMethod('upload')} 
                  className="flex-1 py-3 bg-surface border border-border text-text-main rounded-xl font-bold text-sm hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Unggah Foto
                </button>
              </div>
            </div>
          ) : (
            <>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                onUserMediaError={() => setCameraError(true)}
                className="w-full h-auto rounded-lg object-cover max-h-[400px]"
              />
              <div className="absolute inset-0 border-4 border-primary/50 m-6 rounded-xl animate-pulse pointer-events-none"></div>
              {isScanning && <div className="absolute top-6 left-6 right-6 h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] pointer-events-none animate-scan-laser z-10 rounded-full"></div>}
              {isFlashing && (
                <div className="absolute inset-0 bg-white z-50 pointer-events-none"></div>
              )}
            </>
          )}
        </div>
      )}

      {/* Upload Mode UI (Unified for all features when inputMethod is upload) */}
      {inputMethod === 'upload' && (
        <div 
          className={`relative rounded-xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center min-h-[300px] p-4 transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {imageSrc ? (
            <div className="relative w-full flex flex-col items-center">
              <img id="uploaded-image" src={imageSrc} alt="Uploaded" className="w-full h-auto max-h-[350px] object-contain rounded-lg shadow-sm" />
              <div className="mt-4 flex gap-3">
                <button 
                  onClick={resetUpload}
                  className="px-4 py-2 text-sm text-text-muted hover:text-red-500 bg-surface rounded-lg border border-border transition-colors font-medium"
                >
                  Ganti Gambar
                </button>
                <button 
                  onClick={() => setInputMethod('camera')}
                  className="px-4 py-2 text-sm text-primary font-bold hover:bg-primary/10 bg-primary/5 rounded-lg border border-primary/20 transition-colors"
                >
                  Batal & Kembali
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <label className="cursor-pointer flex flex-col items-center p-8 text-text-muted hover:text-primary transition-colors w-full">
                <ImageIcon className="w-12 h-12 mb-3" />
                <span className="font-medium text-center">{t.selectImage} / Drop Image Here</span>
                <span className="text-xs mt-1 text-gray-400">JPG, PNG, WEBP</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              <button 
                onClick={() => setInputMethod('camera')}
                className="mt-2 text-sm text-text-muted hover:text-text-main underline font-medium"
              >
                Kembali ke Kamera
              </button>
            </div>
          )}
        </div>
      )}

      {/* Barcode Mode */}
      {scanMode === 'barcode' && inputMethod === 'camera' && (
        <div className="relative rounded-xl overflow-hidden border-2 border-border bg-background flex flex-col items-center justify-center min-h-[300px] p-4">
          {barcodeError ? (
            <div className="text-center p-6 bg-red-50 border border-red-200 rounded-xl">
              <CameraOff className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-red-700 mb-2">Akses Kamera Diblokir</h3>
              <p className="text-sm text-red-600">{barcodeError}</p>
            </div>
          ) : (
            <>
              <div id="reader" className="w-full max-w-sm mx-auto overflow-hidden rounded-lg"></div>
              
              <div className="mt-6 w-full max-w-sm mx-auto">
                <button 
                  onClick={() => setInputMethod('upload')}
                  className="w-full btn-secondary bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary cursor-pointer flex flex-col items-center justify-center py-4 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Wand2 className="w-5 h-5" />
                    <span className="font-bold">Gunakan AI AI-Vision</span>
                  </div>
                  <span className="text-xs text-text-muted text-center px-4">Kamera gagal/blur? Unggah foto barcode ke AI untuk dipaksa baca!</span>
                </button>
              </div>

              {isScanning && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-text-main font-bold">Menganalisis Barcode...</p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Scan Button */}
      {(scanMode !== 'barcode' || inputMethod === 'upload') && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={captureAndScan}
            disabled={isScanning || (inputMethod === 'camera' && (!hasRequestedPermission || cameraError)) || (inputMethod === 'upload' && !imageSrc)}
            className="btn-primary w-full sm:w-auto"
          >
            {isScanning ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> {scanMode === 'text' ? 'Mengekstrak Teks' : t.scanButton}...</>
            ) : (
              <><ScanLine className="w-5 h-5" /> {scanMode === 'text' ? 'Ekstrak Teks (OCR)' : t.scanButton}</>
            )}
          </button>
        </div>
      )}

      {/* Custom Error Popup */}
      {errorPopup && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-surface border border-border w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-5 bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-800 relative flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center text-red-600 dark:text-red-300 shrink-0">
                <CameraOff className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-red-700 dark:text-red-400">{errorPopup.title}</h3>
              </div>
            </div>
            <div className="p-5 bg-background">
              <p className="text-sm text-text-main leading-relaxed">
                {errorPopup.message}
              </p>
            </div>
            <div className="p-4 border-t border-border bg-surface flex justify-end">
              <button 
                onClick={() => setErrorPopup(null)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all active:scale-95 text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
