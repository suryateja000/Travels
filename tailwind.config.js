export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Bodoni Moda"', 'serif'], 
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        biscuit: '#F5E6D3', 
      }
    },
  },
  plugins: [],
}