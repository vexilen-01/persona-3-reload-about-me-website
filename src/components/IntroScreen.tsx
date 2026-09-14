import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  onStart: (preloadedMedia?: { videoUrl: string; audioUrl: string }) => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const mediaUrlsRef = useRef<{ videoUrl: string; audioUrl: string } | null>(null);

  // Pre-fetch main menu assets into Blob URLs for zero-latency instant rendering
  useEffect(() => {
    let isMounted = true;

    const preloadAssets = async () => {
      try {
        const [videoRes, audioRes] = await Promise.all([
          fetch('/p3-menu-bg.mp4'),
          fetch('/bg-music-1.mp3')
        ]);

        if (!videoRes.ok || !audioRes.ok) throw new Error('Asset fetch failed');

        const videoBlob = await videoRes.blob();
        const audioBlob = await audioRes.blob();

        const videoUrl = URL.createObjectURL(videoBlob);
        const audioUrl = URL.createObjectURL(audioBlob);

        if (isMounted) {
          mediaUrlsRef.current = { videoUrl, audioUrl };
          setIsPreloaded(true);
        }
      } catch (err) {
        console.warn('Asset preloading fallback active:', err);
        if (isMounted) setIsPreloaded(true);
      }
    };

    preloadAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent double triggers on repeated keypresses
      if (e.repeat) return;
      handleProceed();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  const handleProceed = () => {
    onStart(mediaUrlsRef.current || undefined);
  };

  return (
    <div 
      onClick={handleProceed}
      className="relative w-full h-screen bg-black text-white overflow-hidden cursor-pointer select-none font-display"
    >
      {/* BACKGROUND VIDEO WITH DYNAMIC GRADIENT FALLBACK */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#000a26] via-[#003cb3] to-[#00bfff]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover min-w-full min-h-full opacity-60 mix-blend-screen"
          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
        >
          <source src="/p3-title-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00e5ff]/20 via-transparent to-black/70 animate-pulse pointer-events-none" />
      </div>

      {/* BRANDING LOGO */}
      <div className="absolute top-10 left-12 z-20">
        <div className="text-white text-xl font-black tracking-tighter uppercase italic drop-shadow">
          Persona3 Reload<span className="text-[#00e5ff] font-sans font-normal text-sm ml-1">™</span>
        </div>
      </div>

      {/* P3R BLUE GEOMETRIC BLOCK OVERLAY & PRESS ANY BUTTON PROMPT */}
      <div className="absolute left-12 top-1/3 z-20 max-w-xl">
        <div className="relative">
          <div className="absolute -left-6 -top-4 w-48 h-64 bg-[#0055ff]/80 skew-x-[-12deg] -z-10 mix-blend-screen" />
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-1"
          >
            <h1 className="text-6xl sm:text-7xl font-black italic tracking-tighter leading-none text-white drop-shadow-[4px_4px_0px_#000]">
              PRESS
            </h1>
            <h1 className="text-6xl sm:text-7xl font-black italic tracking-tighter leading-none text-white drop-shadow-[4px_4px_0px_#000]">
              ANY
            </h1>
            <h1 className="text-6xl sm:text-7xl font-black italic tracking-tighter leading-none text-[#00e5ff] drop-shadow-[4px_4px_0px_#000]">
              BUTTON
            </h1>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="mt-8 font-mono text-xs tracking-widest text-gray-200 flex items-center space-x-2"
        >
          <span className={`inline-block w-2 h-2 rounded-full ${isPreloaded ? 'bg-[#00e5ff]' : 'bg-yellow-400'}`} />
          <span>
            {isPreloaded 
              ? 'CLICK ANYWHERE OR PRESS ANY KEY TO PROCEED' 
              : 'LOADING SYSTEM ASSETS...'}
          </span>
        </motion.div>
      </div>

      {/* FOOTER COPYRIGHT */}
      <div className="absolute bottom-10 left-12 z-20 font-mono text-[10px] text-gray-300 space-y-0.5 tracking-wider">
        <p className="font-bold text-white text-xs">ATLUS</p>
        <p>©ATLUS. ©SEGA.</p>
      </div>
    </div>
  );
};