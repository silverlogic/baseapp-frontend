import { PluginFunction } from './types'

export const responsiveTypography: PluginFunction = ({ addUtilities }) => {
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
      '@apply prose-h6 min-md:text-[1.125rem] min-lg:text-[1.125rem]': {},
    },
  })
}

export const hideScrollbar: PluginFunction = ({ addUtilities }) => {
  addUtilities({
    '.hide-scrollbar': {
      'scrollbar-width': 'none',
      '-ms-overflow-style': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  })
}
