import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, Home, ArrowLeft } from 'lucide-react';

const NotFound404 = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full w-40 h-40 mx-auto -z-10 animate-pulse"></div>
        <SearchX className="w-32 h-32 text-primary mx-auto drop-shadow-lg" />
      </div>
      
      <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 mb-4 tracking-tighter drop-shadow-sm">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-3">
        Waduh! Halaman Tidak Ditemukan
      </h2>
      <p className="text-text-muted max-w-md mx-auto mb-10 text-base md:text-lg leading-relaxed">
        Sepertinya kamu tersesat atau salah mengetik alamat URL. Halaman yang kamu cari tidak ada di sistem JackScanner.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl font-bold border-2 border-border text-text-main bg-surface hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali
        </button>
        <Link 
          to="/" 
          className="px-8 py-3 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" /> Ke Beranda Utama
        </Link>
      </div>
    </div>
  );
};

export default NotFound404;
