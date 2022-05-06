/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  mode: 'jit',
  experimental: {
    darkModeVariant: true,
  },
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  // If you want to support toggling dark mode manually instead of relying on the operating system preference,
  // use the class strategy instead of the media strategy:
  darkMode: 'class',
  theme: {
    screens: {
      md: '768px',
      lg: '1200px',
      xl: '1920px',
    },
    extend: {
      screens: {
        // non-touch
        nt: { raw: '(hover: hover)' },
        // touchable
        ta: { raw: '(hover: none)' },
      },
      colors: {
        white: {
          DEFAULT: 'var(--white-color)',
          snow: 'var(--snow-color)',
        },
        yellow: {
          DEFAULT: 'var(--yellow-color)',
        },
        beige: {
          400: 'var(--beige-color-400)',
          300: 'var(--beige-color-300)',
          200: 'var(--beige-color-200)',
          100: 'var(--beige-color-100)',
        },
        orange: {
          DEFAULT: 'var(--orange-color)',
        },
        gold: {
          DEFAULT: 'var(--gold-color)',
          pair: 'var(--grey-color-600)',
        },
        silver: {
          DEFAULT: 'var(--silver-color)',
        },
        grey: {
          800: 'var(--grey-color-800)',
          600: 'var(--grey-color-600)',
          300: 'var(--grey-color-300)',
          250: 'var(--grey-color-250)',
          200: 'var(--grey-color-200)',
          100: 'var(--grey-color-100)',
        },
        special: {
          error: 'var(--error-color)',
          disable: 'var(--disable-color)',
          notSelect: 'var(--grey-color-100)',
        },
      },
      spacing: {
        0.25: '0.0625rem',
        1.25: '0.3125rem',
        3.25: '0.8125rem',
        3.75: '0.9375rem',
        6.5: '1.625rem',
        68: '17rem',
        69: '17.25rem',
        70: '17.5rem',
        71: '17.75rem',
        inherit: 'inherit',
      },
      fontSize: {
        0.63: '0.63rem',
        0.75: '0.75rem',
        '0.75-normal': ['0.75rem', { lineHeight: 'normal' }],
        0.8: '0.8rem',
        0.9: '0.9rem',
        1: '1rem',
        1.25: '1.25rem',
        1.67: ['0.75rem', { lineHeight: '1.67' }],
        0.88: '0.88rem',
        1.13: '1.13rem',
      },
      lineHeight: {
        normal: 'normal',
        0: '0',
        0.5: '0.5',
        0.88: '0.88',
        1.11: '1.11',
        1.14: '1.14',
        1.33: '1.33',
        1.43: '1.43',
        1.67: '1.67',
      },
      letterSpacing: {
        normal: 'normal',
        0: '0em',
      },
      duration: {
        2000: '2000ms',
        3000: '3000ms',
        4000: '4000ms',
        5000: '5000ms',
        6000: '6000ms',
      },
      borderWidth: theme => ({
        ...theme('spacing'),
      }),
      borderRadius: theme => ({
        ...theme('spacing'),
      }),
      minHeight: theme => ({
        ...theme('spacing'),
      }),
      maxHeight: theme => ({
        ...theme('spacing'),
      }),
      minWidth: theme => ({
        ...theme('spacing'),
      }),
      maxWidth: theme => ({
        ...theme('spacing'),
      }),
      stroke: theme => ({
        ...theme('colors'),
      }),
      fill: theme => ({
        ...theme('colors'),
      }),
      zIndex: {
        '-10': '-10',
        35: '35',
      },
      transitionDuration: theme => ({
        ...theme('duration'),
      }),
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'dark'],
    borderColor: ['responsive', 'hover', 'focus', 'dark'],
    boxShadow: ['responsive', 'hover', 'focus', 'dark'],
    textColor: ['responsive', 'hover', 'focus', 'dark'],
    textDecoration: ['responsive', 'hover', 'focus', 'dark'],
  },
}
