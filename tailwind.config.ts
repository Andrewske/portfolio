import type { Config } from 'tailwindcss';

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ['var(--font-jetbrains)'],
        roboto: ['var(--font-roboto)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        custom:
          '0 0 0 1px hsla(0, 0%, 100%, 0.3), 0 0 0 1.5px rgba(0, 0, 0, 0.8), 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.48), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)',
        panel: '0 0 0 1px #2d333b',
      },
      colors: {
        // Terminal syntax highlighting colors - centralized theme tokens
        keyword: '#3b82f6',
        common: '#facc15',
        comment: '#16a34a',
        declaration: '#a855f7',
        default: '#e5e7eb',

        // Workflow design system
        bg: {
          main: '#0b0f0c',
          panel: '#11161c',
          code: '#161b22',
        },
        green: {
          primary: '#39d353',
          secondary: '#2ea043',
          accent: '#238636',
          bright: '#7ee787',
        },
        text: {
          primary: '#e6edf3',
          secondary: '#8b949e',
          body: '#c9d1d9',
          muted: '#8b949e',
        },
        border: '#2d333b',
      },
    },
  },
  plugins: [
    // Custom utilities now defined in CSS using @utility directive
  ],
};

export default config;
