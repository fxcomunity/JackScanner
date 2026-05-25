import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { ScanLine, Loader2, CameraOff, Camera, Upload, Image as ImageIcon, Smartphone, Monitor } from 'lucide-react';
import { i18n } from '../i18n';

const Scanner = ({ onScanResult, lang }) => {
  const webcamRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false);
  const [scanMode, setScanMode] = useState('camera'); // 'camera' or 'upload'
  const [imageSrc, setImageSrc] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const t = i18n[lang].scanner;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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
      const reader = new FileReader();
      reader.onload = (event) => setImageSrc(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const captureAndScan = async () => {
    setIsScanning(true);
    try {
      const base64DataWithPrefix = scanMode === 'camera' 
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

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        alert("Gemini API Key is missing in .env!");
        setIsScanning(false);
        return;
      }

      // Memanggil Gemini 2.5 Flash API
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Identify the main object in this image. Reply with ONLY 1 to 3 specific words describing the object in English. Do not include any other text." },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data
                  }
                }
              ]
            }
          ]
        })
      });

      if (!res.ok) throw new Error("Gemini Vision API error");

      const data = await res.json();
      const detectedLabel = data.candidates[0].content.parts[0].text.trim().toLowerCase();
      
      // Mengirim hasil prediksi tunggal
      if (detectedLabel) {
        onScanResult([{ className: detectedLabel, probability: 0.99 }]);
      }
    } catch (err) {
      console.error("Failed to scan image via Gemini Vision:", err);
      alert("Gagal menganalisis gambar. Periksa koneksi atau API Key.");
    }
    setIsScanning(false);
  };

  const resetUpload = () => {
    setImageSrc(null);
  };

  return (
    <div className="card p-6 overflow-hidden bg-white">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-50 text-primary mb-3">
          <ScanLine className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-text-main">Vision Scanner (Gemini)</h3>
        <p className="text-text-muted mt-2 text-sm">
          {t.pointCamera}
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex bg-gray-100 p-1 rounded-lg mb-6 max-w-xs mx-auto">
        <button
          onClick={() => setScanMode('camera')}
          className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 ${scanMode === 'camera' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Camera className="w-4 h-4" /> {t.modeCamera}
        </button>
        <button
          onClick={() => setScanMode('upload')}
          className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 ${scanMode === 'upload' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Upload className="w-4 h-4" /> {t.modeUpload}
        </button>
      </div>

      {/* Camera Mode */}
      {scanMode === 'camera' && (
        <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-border bg-gray-50 flex flex-col items-center justify-center min-h-[300px] p-2">
          {!hasRequestedPermission || cameraError ? (
            <div className="flex flex-col items-center justify-center p-6 text-center w-full bg-white rounded-xl">
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
                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex gap-4 items-start text-left">
                  <Monitor className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">Di Komputer (Desktop)</p>
                    <p className="text-xs text-gray-600 mt-1">Klik ikon kamera bersilang atau gembok (🔒) di ujung address bar, lalu pilih <b>Allow (Izinkan)</b>.</p>
                  </div>
                </div>
              </div>
              
              {!hasRequestedPermission ? (
                <button 
                  onClick={() => setHasRequestedPermission(true)} 
                  className="mt-6 px-8 py-3 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" /> Mulai Minta Izin Kamera
                </button>
              ) : (
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-6 px-6 py-2.5 bg-red-500 text-white rounded-full font-semibold text-sm hover:bg-red-600 transition-all shadow-md active:scale-95"
                >
                  Muat Ulang Halaman
                </button>
              )}
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
            </>
          )}
        </div>
      )}

      {/* Upload Mode */}
      {scanMode === 'upload' && (
        <div 
          className={`relative rounded-xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center min-h-[300px] p-4 transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-border bg-gray-50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {imageSrc ? (
            <div className="relative w-full flex flex-col items-center">
              <img id="uploaded-image" src={imageSrc} alt="Uploaded" className="w-full h-auto max-h-[350px] object-contain rounded-lg shadow-sm" />
              <button 
                onClick={resetUpload}
                className="mt-4 text-sm text-text-muted hover:text-red-500 transition-colors"
              >
                Hapus Gambar / Remove Image
              </button>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center p-8 text-text-muted hover:text-primary transition-colors">
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
          )}
        </div>
      )}

      {/* Scan Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={captureAndScan}
          disabled={isScanning || (scanMode === 'camera' && cameraError) || (scanMode === 'upload' && !imageSrc)}
          className="btn-primary w-full sm:w-auto"
        >
          {isScanning ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> {t.scanButton}...</>
          ) : (
            <><ScanLine className="w-5 h-5" /> {t.scanButton}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Scanner;
