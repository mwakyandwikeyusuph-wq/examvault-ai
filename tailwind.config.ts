import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#2563EB',
        accent: '#06B6D4',
        success: '#22C55E',
        background: '#F8FAFC',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(96,165,250,.22), 0 20px 45px rgba(30,41,59,.18)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at 1px 1px, rgba(37,99,235,.18) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;
