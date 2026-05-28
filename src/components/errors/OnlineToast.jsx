import React, { useEffect, useState } from 'react';
import { Wifi } from 'lucide-react';

const OnlineToast = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] animate-fade-in-down pointer-events-none">
      <div className="bg-green-50/90 dark:bg-green-900/40 backdrop-blur-md border border-green-200 dark:border-green-800 shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/30">
          <Wifi className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="font-extrabold text-green-800 dark:text-green-300 text-sm md:text-base">
            Koneksi Pulih! 🌐
          </h3>
          <p className="text-green-700/80 dark:text-green-400/80 text-xs mt-0.5">
            Kamu sudah terhubung kembali ke internet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineToast;
