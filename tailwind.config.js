export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4',
        'primary-bright': '#22d3ee',
        surface: '#0f172a',
        'surface-light': '#16161e',
        'surface-lighter': '#1c1c26',
        muted: '#94a3b8',
        accent: {
          cyan: '#22d3ee',
          violet: '#a78bfa',
          amber: '#fbbf24',
        },
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.2,.9,.2,1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(.2,.9,.2,1)',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(34,211,238,0.15)' },
          '100%': { boxShadow: '0 0 40px rgba(34,211,238,0.3)' },
        },
      },
    },
  },
  plugins: [],
}
