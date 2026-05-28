import React from 'react';
import { WifiOff } from 'lucide-react';

const OfflineOverlay = ({ isOffline }) => {
  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl animate-fade-in">
      <div className="bg-surface border border-border p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm text-center">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 shadow-inner border border-red-200 dark:border-red-800">
          <WifiOff className="w-12 h-12 text-red-600 dark:text-red-400 animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-text-main mb-2">Anda Sedang Offline</h2>
        <p className="text-text-muted text-sm leading-relaxed mb-6">
          JackScanner membutuhkan koneksi internet untuk memindai barang dengan AI dan mencari informasi di Wikipedia. Harap periksa koneksi internet Anda.
        </p>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default OfflineOverlay;
