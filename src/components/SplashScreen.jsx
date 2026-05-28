import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    const timer2 = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gray-950 transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative animate-bounce-slight flex flex-col items-center">
        {/* Glowing effect behind logo */}
        <div className="absolute inset-0 bg-primary/40 blur-[60px] rounded-full animate-pulse w-40 h-40 m-auto"></div>
        
        {/* Logo Image with CSS trick to blend black background */}
        <img 
          src="/logo-icon.png" 
          alt="JackScanner Logo" 
          className="w-48 h-48 object-contain z-10 mix-blend-screen drop-shadow-2xl animate-pulse"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/logo-full.png';
          }}
        />
      </div>
      
      <div className="mt-10 z-10 flex flex-col items-center animate-fade-in-up">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 mb-2 tracking-widest drop-shadow-lg">
          JackScanner
        </h1>
        <p className="text-white/60 text-sm tracking-widest font-mono uppercase mb-12">
          Ultimate AI Scanner
        </p>

        {/* Loading Bar Section */}
        <div className="flex flex-col items-center gap-3 w-64">
          <span className="text-primary text-xs font-bold tracking-widest uppercase animate-pulse">
            Memuat Sistem AI...
          </span>
          <div className="w-full h-1.5 bg-gray-800/80 rounded-full overflow-hidden shadow-inner backdrop-blur-sm border border-gray-700/50">
            <div className="h-full bg-gradient-to-r from-primary via-blue-400 to-primary w-full animate-progress-bar shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
