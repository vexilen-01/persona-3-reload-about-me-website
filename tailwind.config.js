/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        p3: {
          bg: '#050b14',
          navy: '#0a192f',
          blue: '#0055ff',
          electric: '#00e5ff',
          cyan: '#7000ff',
          dark: '#02060d',
          accent: '#ffffff'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    }
  },
  plugins: []
};