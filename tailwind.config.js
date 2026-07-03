/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:             '#111111',
        surface:        '#1A1A1A',
        accent:         '#A0B4C8',
        'accent-deep':  '#6B8499',
        'text-primary': '#E8E8E8',
        'text-muted':   '#888888',
        rule:           '#2A2A2A',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)',     'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',      'monospace'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        dmsans:  ['var(--font-dmsans)',  'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '660px',
      },
    },
  },
  plugins: [],
}

module.exports = config
