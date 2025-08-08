/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.08)'
      },
      boxShadow: {
        mac: '0 10px 30px rgba(0,0,0,0.35)'
      },
      borderRadius: {
        mac: '12px'
      }
    }
  },
  plugins: [],
}


