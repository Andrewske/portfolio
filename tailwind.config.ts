import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import colors from 'tailwindcss/colors';

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
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        keyword: colors.blue[500],
        common: colors.yellow[400],
        comment: colors.green[600],
        declaration: colors.purple[500],
        default: colors.gray[200],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.indent-0': {
          'text-indent': '0rem',
          'margin-left': '0rem',
        },
        '.indent-1': {
          'text-indent': '-0.5rem',
          'margin-left': '1.5rem',
        },
        '.indent-2': {
          'text-indent': '-1rem',
          'margin-left': '3rem',
        },
        '.indent-3': {
          'text-indent': '-1.5rem',
          'margin-left': '4.5rem',
        },
        '.indent-4': {
          'text-indent': '-2rem',
          'margin-left': '6rem',
        },
        '.indent-5': {
          'text-indent': '-2.5rem',
          'margin-left': '7.5rem',
        },
        '.indent-6': {
          'text-indent': '-3rem',
          'margin-left': '9rem',
        },
      });
    }),
  ],
};

module.exports = config;
