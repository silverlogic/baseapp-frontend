const { breakpoints } = require('./styles/breakpoint')
const { typography } = require('./styles/typography')
const { createPalette } = require('./styles/palette')
const { createShadows } = require('./styles/shadow')
const { createCustomShadows } = require('./styles/material/custom-shadows')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: `${breakpoints.xs}px`,
      sm: { max: `${breakpoints.sm}px` },
      'min-sm': { min: `${breakpoints.sm}px` },
      md: { max: `${breakpoints.md}px` },
      'min-md': { min: `${breakpoints.md}px` },
      lg: { max: `${breakpoints.lg}px` },
      'min-lg': { min: `${breakpoints.lg}px` },
      xl: { max: `${breakpoints.xl}px` },
      'min-xl': { min: `${breakpoints.xl}px` },
    },
    extend: {
      maxWidth: {
        xs: `${breakpoints.xs}px`,
        sm: `${breakpoints.sm}px`,
        md: `${breakpoints.md}px`,
        lg: `${breakpoints.lg}px`,
        xl: `${breakpoints.xl}px`,
      },
      minWidth: {
        xs: `${breakpoints.xs}px`,
        sm: `${breakpoints.sm}px`,
        md: `${breakpoints.md}px`,
        lg: `${breakpoints.lg}px`,
        xl: `${breakpoints.xl}px`,
      },
      colors: {
        ...createPalette('light'),
      },
      typography: () => ({
        h1: {
          css: typography.h1,
        },
        h2: {
          css: typography.h2,
        },
        h3: {
          css: typography.h3,
        },
        h4: {
          css: typography.h4,
        },
        h5: {
          css: typography.h5,
        },
        h6: {
          css: typography.h6,
        },
        subtitle1: {
          css: typography.subtitle1,
        },
        subtitle2: {
          css: typography.subtitle2,
        },
        body1: {
          css: typography.body1,
        },
        body2: {
          css: typography.body2,
        },
        caption: {
          css: typography.caption,
        },
        overline: {
          css: typography.overline,
        },
        button: {
          css: typography.button,
        },
      }),
      boxShadow: {
        ...createShadows('light'),
        ...createCustomShadows('light'),
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    ({ addUtilities }) => {
      addUtilities({
        // Responsive typography (from h1 to h6)
        '.responsive-h1': {
          '@apply prose-h1 min-md:text-[3.625rem] min-lg:text-[4rem]': {},
        },
        '.responsive-h2': {
          '@apply prose-h2 min-md:text-[2.75rem] min-lg:text-[3rem]': {},
        },
        '.responsive-h3': {
          '@apply prose-h3 min-md:text-[1.875rem] min-lg:text-[2rem]': {},
        },
        '.responsive-h4': {
          '@apply prose-h4 min-md:text-[1.5rem] min-lg:text-[1.5rem]': {},
        },
        '.responsive-h5': {
          '@apply prose-h5 min-md:text-[1.25rem] min-lg:text-[1.25rem]': {},
        },
        '.responsive-h6': {
          '@apply prose-h6': {},
        },
      })
    },
  ],
}
