export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4', // cyan-500 like, tech accent
        surface: '#0f172a',
        muted: '#94a3b8'
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px'
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(.2,.9,.2,1)'
      }
    },
  },
  plugins: [],
}
