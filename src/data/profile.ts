export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  status: 'ACTIVE' | 'IN PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  link?: string;
}

export interface GameItem {
  id: string;
  title: string;
  genre: string;
  platform: string;
  rating: string;
  iconUrl?: string; // ADDED: Allows game icon paths
  personalNote: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl?: string;
}

export interface MusicItem {
  name: string;
  coverUrl: string;
}

export interface Connection {
  id: string;
  name: string;
  category: 'FRIEND' | 'MENTOR' | 'COMMUNITY' | 'COLLABORATION' | 'INSPIRATION';
  description: string;
  status: string;
  link: string;
}

export const PROFILE_DATA = {
  system: {
    currentArc: "ARC I: DIGITAL ECLIPSE",
    dateDisplay: "09.14 / MON",
    timeDisplay: "23:45",
    level: 20,
    xpCurrent: 8400,
    xpMax: 10000
  },
  profile: {
    name: "Vexilen",
    role: "Student / Part-Time Programmer",
    studying: "Computer Science Engineering with Artificial Intelligence",
    interests: ["Retro Tech", "Reverse Engineering", "Game Interface Design"],
    personality: "CHILL / STYLISH / CHALANT ASF",
    bio: "Just a guy who loves tech, programming, video games and music."
  },
  stats: [
    { label: "TECH KNOWLEDGE", value: 88, max: 100 },
    { label: "GENERAL KNOWLEDGE", value: 68, max: 100 },
    { label: "CREATIVITY", value: 50, max: 100 },
    { label: "COURAGE", value: 60, max: 100 },
    { label: "DISCIPLINE", value: 70, max: 100 },
    { label: "GAMING", value: 95, max: 100 },
    { label: "MUSIC", value: 100, max: 100 },
    { label: "CURIOSITY", value: 75, max: 100 }
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "C", "C++", "HTML/CSS", "SQL"],
    frameworks: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Node.js"],
    tools: ["Git", "VS Code", "Figma", "Webpack"],
    currentlyLearning: ["WebGL Shaders", "Rust", "Web Audio API"]
  },
  projects: [
    {
      id: "p1",
      name: "Persona 3 Reload Themed About Me Webpage",
      description: "High-performance interface system inspired by modern JRPG HUD design, liquid particle canvas systems, and dark aesthetic visuals.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "ACTIVE",
      link: "https://github.com/vexilen-01"
    }
  ] as Project[],
 games: [
    {
      id: "g1",
      title: "Persona 3 Reload",
      genre: "JRPG / Adventure / Strategy",
      platform: "PC / Console",
      rating: "10 / 10",
      iconUrl: "/p3r.jpg",
      personalNote: "The primary design inspiration for this entire visual interface. Flawless UI presentation, visual density, and soundtrack composition."
    },
    {
      id: "g2",
      title: "Devil May Cry",
      genre: "Hack and Slash / Action-Adventure",
      platform: "PS2 / PS3 / PC",
      rating: "9.5 / 10",
      iconUrl: "/dmc.jpg",
      personalNote: "One of my favourite games despite being a very old game another game with amazing story with insane combat experience."
    },
    {
      id: "g3",
      title: "Valorant",
      genre: "Tactical Shooter / FPS",
      platform: "PC",
      rating: "7.8 / 10",
      iconUrl: "/valorant.jpg",
      personalNote: "Made me lose some of my sanity but the game overall is fine xD."
    },
    {
      id: "g4",
      title: "Marvel Rivals",
      genre: "Hero Shooter / Action",
      platform: "PC",
      rating: "8.8 / 10",
      iconUrl: "/marvel-rivals.jpg",
      personalNote: "Another game which makes me lose my mind but I somehow manage </3."
    }
  ] as GameItem[],
  music: {
    playlist: [
      {
        id: "m1",
        title: "Color Your Night",
        artist: "Lotus Juice, Azumi Takahashi",
        album: "Persona 3 Reload Original Soundtrack",
        coverUrl: "/p3r.jpg",
        audioUrl: "/bg-music-1.mp3"
      },
      {
        id: "m2",
        title: "Full Moon Full Life",
        artist: "Azumi Takahashi, Lotus Juice",
        album: "Persona 3 Reload Original Soundtrack",
        coverUrl: "/p3r.jpg",
        audioUrl: "/bg-music-2.mp3"
      },
      {
        id: "m3",
        title: "Mass Destruction (-Reload-)",
        artist: "Lotus Juice, Azumi Takahashi",
        album: "Persona 3 Reload Original Soundtrack",
        coverUrl: "/p3r.jpg",
        audioUrl: "/bg-music-3.mp3"
      },
      {
        id: "m4",
        title: "It's Going Down Now",
        artist: "Lotus Juice, Azumi Takahashi",
        album: "Persona 3 Reload Original Soundtrack",
        coverUrl: "/p3r.jpg",
        audioUrl: "/bg-music-4.mp3"
      },
      {
        id: "m5",
        title: "When The Moon's Reaching Out Stars (-Reload-)",
        artist: "Azumi Takahashi, Lotus Juice",
        album: "Persona 3 Reload Original Soundtrack",
        coverUrl: "/p3r.jpg",
        audioUrl: "/bg-music-5.mp3"
      }
    ] as Track[],
    favorites: [
      { name: "Joji", coverUrl: "/joji.jpg" },
      { name: "aespa", coverUrl: "/aespa.jpg" },
      { name: "Tory Lanez", coverUrl: "/tory-lanez.jpg" },
      { name: "Deftones", coverUrl: "/deftones.jpg" },
      { name: "Slipknot", coverUrl: "/slipknot.jpg" }
    ] as MusicItem[],
    favoriteAlbums: [
      { name: "Piss In The Wind", coverUrl: "/piss-in-the-wind.jpg" },
      { name: "LEMONADE", coverUrl: "/lemonade.jpg" },
      { name: "Koi No Yokan", coverUrl: "/koi-no-yokan.jpg" },
      { name: "Alone at Prom", coverUrl: "/alone-at-prom.jpg" },
      { name: "The Subliminal Verses", coverUrl: "/the-subliminal-verses.jpg" }
    ] as MusicItem[],
    genres: ["Pop", "Kpop", "Alt Metal"]
  },
  timeline: [
    {
      year: "2026",
      title: "First Project",
      category: "MILESTONE",
      description: "Working on my first ever project <3"
    },
    {
      year: "2025",
      title: "Advanced Skill Development",
      category: "MILESTONE",
      description: "Learning Advanced Knowledge of Known Things"
    },
    {
      year: "2024",
      title: "First Step Into The Programming World",
      category: "EDUCATION",
      description: 'Wrote my first line of code: print("Hello World")'
    }
  ],
  socialmedia: [
    {
      id: "c1",
      name: "GitHub Profile",
      category: "COLLABORATION",
      description: "Code repositories and software projects.",
      status: "LINKED",
      link: "https://github.com/vexilen-01"
    },
    {
      id: "c2",
      name: "Instagram",
      category: "COMMUNITY",
      description: "Personal social updates and visuals.",
      status: "LINKED",
      link: "https://www.instagram.com/vexilen_/"
    },
    {
      id: "c3",
      name: "Reddit",
      category: "COMMUNITY",
      description: "Gaming, tech communities, and discussions.",
      status: "LINKED",
      link: "https://www.reddit.com/user/Swimming-Round-1963/"
    }
  ] as Connection[],
  importantDates: [
    { date: "09/14", event: "SYSTEM INITIALIZATION" }
  ],
  socialLinks: {
    github: "https://github.com/vexilen-01",
    instagram: "https://www.instagram.com/vexilen_/",
    reddit: "https://www.reddit.com/user/Swimming-Round-1963/",
    email: "rayaan.ben10@gmail.com"
  }
};