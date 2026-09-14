import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE_DATA, type Track,type Connection } from '../data/profile';

const NAV_ITEMS = [
  'PROFILE',
  'STATUS',
  'TECH',
  'GAMING',
  'MUSIC',
  'JOURNEY',
  'SOCIAL MEDIA'
];

interface MainInterfaceProps {
  mediaUrls?: {
    videoUrl?: string;
    audioUrl?: string;
  };
}

export const MainInterface: React.FC<MainInterfaceProps> = ({ mediaUrls }) => {
  const [activeTab, setActiveTab] = useState('PROFILE');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist: Track[] = PROFILE_DATA.music?.playlist || [
    {
      id: "m1",
      title: "Color Your Night",
      artist: "Lotus Juice, Azumi Takahashi",
      album: "Persona 3 Reload OST",
      coverUrl: "/p3r.jpg",
      audioUrl: "/bg-music-1.mp3"
    }
  ];

  const currentTrack = playlist[currentTrackIndex] || playlist[0];
  const activeAudioSrc = (currentTrackIndex === 0 && mediaUrls?.audioUrl) 
    ? mediaUrls.audioUrl 
    : currentTrack.audioUrl;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.08;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Playback interrupted or blocked:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [activeAudioSrc, isPlaying]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.08;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Autoplay blocked by browser:", err);
            setIsPlaying(false);
          });
      }
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="relative w-full h-screen bg-[#020713] text-white overflow-hidden flex flex-col justify-between font-body select-none">
      
      {/* PERSISTENT AUDIO PLAYER */}
      <audio 
        ref={audioRef} 
        src={activeAudioSrc}
        loop 
        preload="auto" 
      />

      {/* FULL-SCREEN VIDEO / IMAGE BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#010816]">
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
          <source src={mediaUrls?.videoUrl || "/p3-menu-bg.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0048cd]/40 to-[#000a26] pointer-events-none" />
      </div>

      {/* TOP HUD OVERLAY */}
      <header className="relative z-40 flex justify-end items-center px-8 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center space-x-4 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleAudio}
              className={`px-3 py-1 flex items-center space-x-2 border transition-all skew-x-[-12deg] ${
                isPlaying
                  ? 'bg-[#00e5ff] text-black border-[#00e5ff] font-bold shadow-[2px_2px_0px_#000]'
                  : 'bg-[#0055ff]/40 text-[#00e5ff] border-[#00e5ff]/50 hover:bg-[#0055ff]/70'
              }`}
            >
              <span className="block skew-x-[12deg] flex items-center gap-1.5">
                <span>{isPlaying ? '🔊 AUDIO: ON' : '📁 AUDIO: OFF'}</span>
                {isPlaying && <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-black" />}
              </span>
            </button>
          </div>

          <div className="hidden sm:block">
            <span className="text-gray-400">LVL </span>
            <span className="text-[#00e5ff] font-bold text-sm">{PROFILE_DATA.system.level}</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-gray-400">DATE </span>
            <span className="text-white">{PROFILE_DATA.system.dateDisplay}</span>
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <div className="relative z-30 flex-1 flex overflow-hidden">
        
        {/* DYNAMIC P3R MENU STACK WITH EXPANDED SPACING */}
        <nav className="relative z-30 w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start pl-4 lg:pl-28 py-6 space-y-4 lg:space-y-5">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeTab === item;
            const staggerX = index * 16; 

            return (
              <div
                key={item}
                className={`relative my-0.5 ${isActive ? 'z-30' : 'z-10'}`}
                style={{ transform: `translateX(${staggerX}px)` }}
              >
                <motion.button
                  onClick={() => setActiveTab(item)}
                  animate={{ 
                    rotate: isActive ? 0 : -12,
                    scale: isActive ? 1.05 : 1
                  }}
                  whileHover={{ 
                    scale: isActive ? 1.08 : 1.05, 
                    x: 10 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25 
                  }}
                  style={{ transformOrigin: 'center left' }}
                  className={`relative font-display font-black text-4xl lg:text-5xl tracking-tighter uppercase transition-colors duration-150 block ${
                    isActive
                      ? 'text-black'
                      : 'text-[#00bfff] hover:text-white drop-shadow-[2px_2px_0px_#001845]'
                  }`}
                >
                  {/* ACTIVE RED/PINK HIGHLIGHT BOX */}
                  {isActive && (
                    <motion.div
                      layoutId="activeP3RHighlight"
                      className="absolute -inset-x-4 -inset-y-1 bg-gradient-to-r from-[#ff0055] to-[#ff2a00] border-2 border-white shadow-[4px_4px_0px_#000] -z-10 skew-x-[-12deg]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 italic block">
                    {item}
                  </span>
                </motion.button>
              </div>
            );
          })}
        </nav>

        {/* RIGHT CONTENT DISPLAY PANEL */}
        <main className="relative z-20 flex-1 bg-transparent p-6 lg:p-10 overflow-y-auto flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {activeTab === 'PROFILE' && <ProfilePanel />}
              {activeTab === 'STATUS' && <StatusPanel />}
              {activeTab === 'TECH' && <TechPanel />}
              {activeTab === 'GAMING' && <GamingPanel />}
              {activeTab === 'MUSIC' && (
                <MusicPanel 
                  currentTrack={currentTrack}
                  currentTrackIndex={currentTrackIndex}
                  totalTracks={playlist.length}
                  isPlaying={isPlaying}
                  onTogglePlay={toggleAudio}
                  onNextTrack={nextTrack}
                  onPrevTrack={prevTrack}
                />
              )}
              {activeTab === 'JOURNEY' && <JourneyPanel />}
              {activeTab === 'SOCIAL MEDIA' && <SocialMediaPanel />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

/* --- SUB-PANELS --- */

const ProfilePanel = () => (
  <div className="max-w-2xl space-y-6">
    <h2 className="text-4xl font-display font-black text-white italic tracking-tighter border-b-4 border-[#00e5ff] pb-1 inline-block -rotate-2">
      CHARACTER PROFILE
    </h2>
    <div className="space-y-4 text-sm text-gray-200">
      <div className="bg-[#020713]/80 backdrop-blur-md p-4 border-l-4 border-[#ff0055] space-y-1 shadow-lg">
        <span className="text-xs font-mono text-[#00e5ff] block tracking-widest">NAME & ROLE</span>
        <p className="font-bold text-lg text-white">{PROFILE_DATA.profile.name}</p>
        <p className="text-gray-300 font-mono text-xs">{PROFILE_DATA.profile.role}</p>
      </div>
      <div className="bg-[#020713]/80 backdrop-blur-md p-4 border-l-4 border-[#ff0055] space-y-1 shadow-lg">
        <span className="text-xs font-mono text-[#00e5ff] block tracking-widest">EDUCATION / STUDYING</span>
        <p className="text-white">{PROFILE_DATA.profile.studying}</p>
      </div>
      <div className="bg-[#020713]/80 backdrop-blur-md p-4 border-l-4 border-[#ff0055] space-y-1 shadow-lg">
        <span className="text-xs font-mono text-[#00e5ff] block tracking-widest">PERSONALITY PARAMETERS</span>
        <p className="text-white font-mono text-xs">{PROFILE_DATA.profile.personality}</p>
      </div>
      <div className="bg-[#020713]/80 backdrop-blur-md p-4 border-l-4 border-[#ff0055] space-y-1 shadow-lg">
        <span className="text-xs font-mono text-[#00e5ff] block tracking-widest">BIOGRAPHY</span>
        <p className="leading-relaxed text-gray-300">{PROFILE_DATA.profile.bio}</p>
      </div>
    </div>
  </div>
);

const StatusPanel = () => (
  <div className="max-w-2xl space-y-6">
    <h2 className="text-4xl font-display font-black text-white italic tracking-tighter border-b-4 border-[#00e5ff] pb-1 inline-block -rotate-2">
      SYSTEM PARAMETERS
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {PROFILE_DATA.stats.map((stat) => (
        <div key={stat.label} className="bg-[#020713]/80 backdrop-blur-md p-4 border border-[#0055ff]/40 space-y-2 shadow-lg">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-white font-bold">{stat.label}</span>
            <span className="text-[#00e5ff] font-bold">{stat.value} / {stat.max}</span>
          </div>
          <div className="w-full bg-[#02060d] h-3 border border-[#0055ff]/50 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stat.value / stat.max) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#ff0055] via-[#0055ff] to-[#00e5ff]"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TechPanel = () => (
  <div className="max-w-3xl space-y-6">
    <h2 className="text-4xl font-display font-black text-white italic tracking-tighter border-b-4 border-[#00e5ff] pb-1 inline-block -rotate-2">
      TECH & MISSIONS
    </h2>
    <div className="grid gap-4">
      {PROFILE_DATA.projects.map((proj) => (
        <div key={proj.id} className="bg-[#020713]/80 backdrop-blur-md border border-[#0055ff]/40 p-5 hover:border-[#ff0055] transition-colors shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-display font-bold text-white">{proj.name}</h3>
            <span className="px-2 py-0.5 text-xs font-mono bg-[#ff0055]/30 border border-[#ff0055] text-white">
              {proj.status}
            </span>
          </div>
          <p className="text-sm text-gray-300 mt-2">{proj.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {proj.techStack.map((tech) => (
              <span key={tech} className="text-xs font-mono bg-[#02060d] border border-gray-700 px-2 py-1 text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GamingPanel = () => (
  <div className="max-w-2xl space-y-6">
    <h2 className="text-4xl font-display font-black text-white italic tracking-tighter border-b-4 border-[#00e5ff] pb-1 inline-block -rotate-2">
      GAME ARCHIVE
    </h2>
    <div className="grid gap-4">
      {PROFILE_DATA.games.map((game) => (
        <div key={game.id} className="bg-[#020713]/80 backdrop-blur-md border border-[#0055ff]/40 p-4 flex space-x-4 items-center hover:border-[#00e5ff] transition-colors shadow-lg">
          <div className="relative w-14 h-14 bg-[#0055ff]/30 border border-[#00e5ff] flex-shrink-0 overflow-hidden flex items-center justify-center rounded">
            {game.iconUrl ? (
              <img 
                src={game.iconUrl} 
                alt={game.title}
                className="w-full h-full object-cover relative z-10"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            ) : null}
            <span className="font-mono text-sm text-[#00e5ff] font-bold absolute z-0">
              {game.title.charAt(0)}
            </span>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-lg text-white">{game.title}</h3>
              <span className="text-xs font-mono text-[#00e5ff] bg-[#0055ff]/30 px-2 py-0.5 border border-[#00e5ff]/50">
                {game.rating}
              </span>
            </div>
            <div className="flex space-x-4 font-mono text-xs text-gray-400">
              <span>GENRE: {game.genre}</span>
              <span>PLATFORM: {game.platform}</span>
            </div>
            <p className="text-xs text-gray-300 italic pt-1">{game.personalNote}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface MusicPanelProps {
  currentTrack: Track;
  currentTrackIndex: number;
  totalTracks: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

const MusicPanel: React.FC<MusicPanelProps> = ({
  currentTrack,
  currentTrackIndex,
  totalTracks,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack
}) => (
  <div className="max-w-3xl space-y-6">
    <h2 className="text-4xl font-display font-black text-white italic tracking-tighter border-b-4 border-[#00e5ff] pb-1 inline-block -rotate-2">
      MUSIC CORNER
    </h2>

    <div className="bg-[#020713]/80 backdrop-blur-md p-6 border border-[#00e5ff]/50 space-y-4 relative shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-[#00e5ff] block tracking-widest">
          NOW PLAYING [{currentTrackIndex + 1}/{totalTracks}]
        </span>
        
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={onPrevTrack}
            className="px-2 py-1 bg-[#0055ff]/40 border border-[#00e5ff]/50 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black transition-colors"
            title="Previous Song"
          >
            ◄ PREV
          </button>
          <button
            onClick={onTogglePlay}
            className={`px-3 py-1 border transition-colors ${
              isPlaying
                ? 'bg-[#00e5ff] text-black border-[#00e5ff] font-bold'
                : 'bg-[#0055ff]/20 text-[#00e5ff] border-[#00e5ff]/50 hover:bg-[#0055ff]/40'
            }`}
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
          <button
            onClick={onNextTrack}
            className="px-2 py-1 bg-[#0055ff]/40 border border-[#00e5ff]/50 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black transition-colors"
            title="Next Song"
          >
            NEXT ►
          </button>
        </div>
      </div>

      <div className="flex space-x-4 items-center">
        <div className="relative w-20 h-20 bg-[#0055ff]/30 border border-[#00e5ff] overflow-hidden flex-shrink-0 flex items-center justify-center">
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.album}
            className="w-full h-full object-cover relative z-10"
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
          />
          <span className="font-mono text-xs text-[#00e5ff] absolute z-0">COVER</span>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold text-white">{currentTrack.title}</h4>
          <p className="text-sm text-gray-300">{currentTrack.artist}</p>
          <p className="text-xs text-[#00e5ff] font-mono mt-1">{currentTrack.album}</p>
        </div>
      </div>

      <div className="w-full h-2 bg-[#02060d] rounded overflow-hidden flex gap-1">
        <div className={`h-full w-1/3 bg-[#00e5ff] ${isPlaying ? 'animate-pulse' : 'opacity-40'}`} />
        <div className={`h-full w-1/4 bg-[#ff0055] ${isPlaying ? 'animate-pulse' : 'opacity-40'}`} />
        <div className={`h-full w-1/2 bg-[#00e5ff] ${isPlaying ? 'animate-pulse' : 'opacity-40'}`} />
      </div>
    </div>

    <div className="bg-[#020713]/80 backdrop-blur-md p-6 border border-[#00e5ff]/50 space-y-4 shadow-lg">
      <span className="text-xs font-mono text-[#00e5ff] block tracking-widest">FAVORITE ARTISTS</span>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {PROFILE_DATA.music.favorites.map((artist, idx) => (
          <div key={idx} className="bg-[#050b14]/70 border border-[#0055ff]/40 p-2.5 flex flex-col items-center text-center space-y-2 hover:border-[#ff0055] transition-colors">
            <div className="relative w-14 h-14 bg-[#0055ff]/20 border border-[#00e5ff]/50 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src={artist.coverUrl} 
                alt={artist.name}
                className="w-full h-full object-cover relative z-10"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span className="font-mono text-xs text-[#00e5ff] absolute z-0">{artist.name.charAt(0)}</span>
            </div>
            <span className="font-display text-xs font-bold text-white tracking-wide">{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const JourneyPanel = () => (
  <div className="max-w-2xl space-y-6">
    <h2 className="text-4xl font-display font-black text-white italic tracking-tighter border-b-4 border-[#00e5ff] pb-1 inline-block -rotate-2">
      THE JOURNEY
    </h2>
    <div className="space-y-4 border-l-2 border-[#ff0055] pl-4">
      {PROFILE_DATA.timeline.map((item, idx) => (
        <div key={idx} className="relative space-y-1">
          <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-[#00e5ff] rounded-full" />
          <span className="font-mono text-xs text-[#00e5ff]">{item.year} — {item.category}</span>
          <h4 className="font-display font-bold text-base text-white">{item.title}</h4>
          <p className="text-xs text-gray-300">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const SocialMediaPanel = () => {
  const renderIcon = useCallback((name: string) => {
    const lower = name.toLowerCase();

    if (lower.includes('github')) {
      return (
        <svg className="w-5 h-5 fill-current text-[#00e5ff]" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    }

    if (lower.includes('instagram')) {
      return (
        <svg className="w-5 h-5 fill-none stroke-current text-[#00e5ff]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    }

    if (lower.includes('reddit')) {
      return (
        <svg className="w-5 h-5 fill-current text-[#00e5ff]" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.194-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.025.2.038.406.038.614 0 3.107-3.606 5.625-8.055 5.625-4.449 0-8.055-2.518-8.055-5.625 0-.203.012-.405.036-.603C2.333 13.333 1.9 12.719 1.9 12.004c0-.968.786-1.754 1.754-1.754.463 0 .886.182 1.194.49 1.192-.853 2.844-1.413 4.665-1.487l.951-4.463 3.323.702a1.246 1.246 0 0 1 1.228-1.748z" />
        </svg>
      );
    }

    return (
      <svg className="w-5 h-5 fill-none stroke-current text-[#00e5ff]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    );
  }, []);

  const socialList: Connection[] = (PROFILE_DATA as any).socialmedia || (PROFILE_DATA as any).socialMedia || [];

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-4xl font-display font-black text-white italic tracking-tighter border-b-4 border-[#00e5ff] pb-1 inline-block -rotate-2">
        SOCIAL MEDIA
      </h2>
      <div className="grid gap-4">
        {socialList.map((conn) => (
          <a
            key={conn.id}
            href={conn.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#020713]/80 backdrop-blur-md border border-[#0055ff]/40 p-4 space-y-1 hover:border-[#ff0055] transition-colors group shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#0055ff]/30 border border-[#00e5ff]/50 rounded group-hover:bg-[#ff0055]/30 transition-colors flex items-center justify-center">
                  {renderIcon(conn.name)}
                </div>
                <h4 className="font-display font-bold text-white text-base group-hover:text-[#00e5ff] transition-colors">
                  {conn.name}
                </h4>
              </div>
              <span className="font-mono text-xs text-[#00e5ff] px-2 py-0.5 bg-[#0055ff]/30 border border-[#00e5ff]/40 flex items-center gap-1">
                {conn.status} ►
              </span>
            </div>
            <span className="text-xs font-mono text-gray-400 block pt-1 pl-12">{conn.category}</span>
            <p className="text-xs text-gray-300 pl-12">{conn.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};