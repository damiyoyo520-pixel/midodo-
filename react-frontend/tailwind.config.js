/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // G-Tech 视觉风格配色系统
        primary: {
          DEFAULT: '#DC2626',      // 高级全息国家党政红
          light: '#EF4444',        // 浅红
          dark: '#B91C1C',         // 深红
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#6B1919',
        },
        background: {
          white: '#FFFFFF',
          gray: '#F3F4F6',
          grayLight: '#F9FAFB',
          grayDark: '#E5E7EB',
        },
        text: {
          primary: '#111827',      // 深灰主文字
          secondary: '#374151',    // 次要文字
          tertiary: '#6B7280',     // 辅助文字
        },
        accent: {
          DEFAULT: '#2563EB',      // 科技蓝
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
        border: {
          light: '#F0F0F0',
          DEFAULT: '#E5E7EB',
          dark: '#D1D5DB',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          '"Helvetica Neue"', 
          'Arial', 
          'sans-serif'
        ],
        mono: [
          '"SF Mono"', 
          'Monaco', 
          'Inconsolata', 
          'Roboto Mono', 
          'monospace'
        ],
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '4px',
        'lg': '6px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'DEFAULT': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'xl': '0 12px 32px rgba(0, 0, 0, 0.16)',
        'glow': '0 0 20px rgba(220, 38, 38, 0.3)',
        'glow-light': '0 0 10px rgba(220, 38, 38, 0.15)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'bounce-in': 'bounce-in 0.5s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(220, 38, 38, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(220, 38, 38, 0.4)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [],
}
