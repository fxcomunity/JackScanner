import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, X, Play, Pause, SkipForward, SkipBack, Disc3, ListMusic } from 'lucide-react';

const SONGS = [
  { id: 'dj1', title: 'DJ Dia Turun Dia Naik', artist: 'Pesta Jedag Jedug 2026', url: 'https://github.com/fxcomunity/JackScanner/releases/download/Sound/DJ.DIA.TURUN.DIA.NAIK.DI.PESTA.TEKANAN.NYA.TINGGI.SLOW.VIRAL.TIKTOK.FULL.SONG.2026.mp3' },
  { id: 'dj2', title: 'DJ Gadis Manis', artist: 'Kalimantan Viral TikTok', url: 'https://github.com/fxcomunity/JackScanner/releases/download/Sound/DJ.GADIS.MANIS.KALIMANTAN.SOUND.JEDAG.JEDUG.VIRAL.TIKTOK.YANG.KALIAN.CARI.CARI.mp3' }
];

const SoundMenu = () => {
  const [isSoundOn, setIsSoundOn] = useState(localStorage.getItem('isSoundOn') !== 'false');
  const [isSoundMenuOpen, setIsSoundMenuOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(localStorage.getItem('selectedSong') || 'none');
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const toggleSound = () => {
    const newState = !isSoundOn;
    setIsSoundOn(newState);
    localStorage.setItem('isSoundOn', newState);
  };

  const handleSelectSong = (songId) => {
    if (selectedSong === songId) {
      setSelectedSong('none');
      localStorage.setItem('selectedSong', 'none');
      setIsPlaying(false);
    } else {
      setSelectedSong(songId);
      localStorage.setItem('selectedSong', songId);
      setIsPlaying(true);
      if (!isSoundOn) {
        toggleSound(); // Auto unmute when picking a new song
      }
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || selectedSong === 'none') return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    if (selectedSong === 'none') return;
    const currentIndex = SONGS.findIndex(s => s.id === selectedSong);
    const nextIndex = (currentIndex + 1) % SONGS.length;
    handleSelectSong(SONGS[nextIndex].id);
  };

  const handlePrevSong = () => {
    if (selectedSong === 'none') return;
    const currentIndex = SONGS.findIndex(s => s.id === selectedSong);
    const prevIndex = (currentIndex - 1 + SONGS.length) % SONGS.length;
    handleSelectSong(SONGS[prevIndex].id);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const activeSongData = SONGS.find(s => s.id === selectedSong);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
      else audioRef.current.pause();
    }
  }, [isPlaying, selectedSong]);

  return (
    <>
      {/* Hidden Audio Player for Background Music */}
      {selectedSong !== 'none' && (
        <audio 
          ref={audioRef}
          src={activeSongData?.url || ''} 
          autoPlay={isPlaying}
          loop 
          muted={!isSoundOn}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          id="bg-music"
        />
      )}

      {/* Sound Menu Popover */}
      {isSoundMenuOpen && (
        <div className="mb-3 bg-[#121212] rounded-xl shadow-2xl border border-[#282828] w-80 transform origin-bottom-right overflow-hidden flex flex-col font-sans animate-fade-in-up">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#282828] bg-[#181818]">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <ListMusic className="w-4 h-4 text-[#1DB954]" /> JackScanner Playlist
            </span>
            <button onClick={() => setIsSoundMenuOpen(false)} className="text-[#B3B3B3] hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Playlist */}
          <div className="px-2 py-2 max-h-48 overflow-y-auto">
            {SONGS.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => handleSelectSong(song.id)}
                className={`w-full flex items-center text-left py-2 px-3 rounded-md transition-colors group ${selectedSong === song.id ? 'bg-[#2A2A2A]' : 'hover:bg-[#1A1A1A]'}`}
              >
                <div className="w-6 text-center mr-2">
                  {selectedSong === song.id && isPlaying ? (
                    <Music className="w-4 h-4 text-[#1DB954] animate-bounce mx-auto" />
                  ) : (
                    <span className={`text-xs font-medium ${selectedSong === song.id ? 'text-[#1DB954]' : 'text-[#B3B3B3] group-hover:text-white'}`}>{idx + 1}</span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className={`text-sm font-semibold truncate ${selectedSong === song.id ? 'text-[#1DB954]' : 'text-white'}`}>
                    {song.title}
                  </p>
                  <p className="text-[#B3B3B3] text-xs truncate">
                    {song.artist}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Now Playing Bar */}
          <div className="bg-[#181818] border-t border-[#282828] p-3 flex flex-col gap-3">
            
            <div className="flex items-center justify-between">
              {/* Album Art & Title */}
              <div className="flex items-center gap-3 overflow-hidden w-1/3">
                <div className="w-10 h-10 rounded bg-[#282828] flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md">
                  {selectedSong !== 'none' ? (
                     <Disc3 className={`w-6 h-6 text-[#1DB954] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                  ) : (
                    <Music className="w-5 h-5 text-[#B3B3B3]" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-sm font-bold text-white truncate cursor-default hover:underline decoration-white">
                    {selectedSong !== 'none' ? activeSongData.title : 'Tidak ada musik'}
                  </p>
                  <p className="text-xs text-[#B3B3B3] truncate cursor-default hover:underline decoration-[#B3B3B3]">
                    {selectedSong !== 'none' ? activeSongData.artist : 'Pilih lagu di atas'}
                  </p>
                </div>
              </div>

              {/* Center Playback Controls */}
              <div className="flex flex-col items-center justify-center w-1/3 gap-1">
                <div className="flex items-center justify-center gap-4">
                  <button onClick={handlePrevSong} className="text-[#B3B3B3] hover:text-white transition-colors" disabled={selectedSong === 'none'}>
                    <SkipBack className="w-4 h-4 fill-current" />
                  </button>
                  <button 
                    onClick={togglePlayPause}
                    disabled={selectedSong === 'none'}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md ${selectedSong !== 'none' ? 'bg-white text-black' : 'bg-[#282828] text-[#555]'}`}
                  >
                    {isPlaying && selectedSong !== 'none' ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <button onClick={handleNextSong} className="text-[#B3B3B3] hover:text-white transition-colors" disabled={selectedSong === 'none'}>
                    <SkipForward className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>

              {/* Right Side Controls (Mute System Sound) */}
              <div className="flex items-center justify-end w-1/3 gap-2">
                <button 
                  onClick={toggleSound}
                  className={`text-[#B3B3B3] hover:text-white transition-colors ${isSoundOn ? '' : 'text-[#1DB954]'}`}
                  title={isSoundOn ? "Matikan Semua Suara (Bisu)" : "Nyalakan Semua Suara"}
                >
                  {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-[#B3B3B3] w-8 text-right">
                {selectedSong !== 'none' ? formatTime(currentTime) : '-:--'}
              </span>
              <div className="h-1 bg-[#4D4D4D] rounded-full flex-1 overflow-hidden group cursor-pointer relative">
                <div 
                  className="h-full bg-white group-hover:bg-[#1DB954] transition-colors relative"
                  style={{ width: selectedSong !== 'none' ? `${progress}%` : '0%' }}
                ></div>
              </div>
              <span className="text-[10px] font-medium text-[#B3B3B3] w-8">
                {selectedSong !== 'none' ? formatTime(duration) : '-:--'}
              </span>
            </div>
            
          </div>
        </div>
      )}

      {/* Floating Entry Button */}
      <button 
        onClick={() => setIsSoundMenuOpen(!isSoundMenuOpen)}
        className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative group ${selectedSong !== 'none' && isSoundOn ? 'bg-[#1DB954] text-black' : 'bg-[#181818] text-white border-2 border-[#282828]'}`}
        title="Spotify Player"
      >
        <div className="absolute right-full mr-3 bg-[#282828] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {selectedSong !== 'none' ? (isSoundOn && isPlaying ? "Now Playing..." : "Paused / Muted") : "Playlist Sound"}
        </div>
        {selectedSong !== 'none' && isSoundOn && isPlaying ? <Disc3 className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} /> : <Music className="w-5 h-5" />}
      </button>
    </>
  );
};

export default SoundMenu;
