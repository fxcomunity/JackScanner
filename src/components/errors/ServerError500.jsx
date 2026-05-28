import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ServerError500 = ({ error }) => {
  return (
    <div className="min-h-screen bg-red-50 dark:bg-background flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full w-32 h-32 mx-auto -z-10 animate-pulse"></div>
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-500 animate-bounce-slight" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-red-600 dark:text-red-500 mb-3 drop-shadow-sm">
        Aplikasi Mengalami Crash
      </h1>
      <p className="text-red-800 dark:text-red-300 max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
        Terjadi kesalahan internal yang menyebabkan aplikasi tidak dapat berjalan sebagaimana mestinya.
      </p>
      
      <div className="w-full max-w-4xl bg-white dark:bg-surface border border-red-200 dark:border-red-900/50 rounded-2xl shadow-lg p-5 mb-8 text-left overflow-x-auto">
        <p className="font-bold text-red-800 dark:text-red-400 mb-2 text-sm flex items-center gap-2">
          Detail Error (500):
        </p>
        <pre className="text-xs text-red-700 dark:text-red-300 font-mono whitespace-pre-wrap">
          {error?.toString() || "Unknown Error"}
        </pre>
      </div>
      
      <button 
        onClick={() => window.location.reload()}
        className="px-8 py-3 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-5 h-5" /> Muat Ulang Halaman
      </button>
    </div>
  );
};

export default ServerError500;
