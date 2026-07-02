/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0e27',
        'dark-card': '#1a1f3a',
        'dark-border': '#2d3561',
        'neon-cyan': '#00d9ff',
        'neon-purple': '#b366ff',
        'neon-green': '#39ff14',
        'neon-pink': '#ff006e',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      backdropFilter: {
        'glass': 'backdrop-filter blur(10px)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(179, 102, 255, 0.3)',
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addUtilities }) => {
      addUtilities({
        '.backdrop-glass': {
          'backdrop-filter': 'blur(10px)',
          'background-color': 'rgba(26, 31, 58, 0.8)',
        },
      });
    }),
  ],
};
