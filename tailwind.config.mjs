/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        bg: {
          main: '#fafafa',
          card: '#ffffff',
        },
        text: {
          primary: '#1f2937',
          secondary: '#6b7280',
          muted: '#9ca3af',
        },
      },
      fontFamily: {
        main: ['"Klee One"', 'cursive'],
        serifu: ['"RocknRoll One"', 'cursive'],
      },
    },
  },
  plugins: [],
};
