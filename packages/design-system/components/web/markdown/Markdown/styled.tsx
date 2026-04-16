import { Box } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

/**
 * Styled wrapper for rendered markdown content.
 *
 * Styles are unified from the MarkdownEditorField editor styles
 * (`packages/design-system/components/web/inputs/MarkdownEditorField/styled.tsx`)
 * to ensure visual consistency between editing and viewing markdown.
 *
 * Keep these in sync when modifying.
 */
export const StyledMarkdown = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: 'body1' | 'body2' }>(({ theme, variant }) => {
  const lightMode = theme.palette.mode === 'light'

  return {
    ...theme.typography[variant],
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',

    // Headings
    h1: { margin: 0, ...theme.typography.h1 },
    h2: { margin: 0, ...theme.typography.h2 },
    h3: { margin: 0, ...theme.typography.h3 },
    h4: { margin: 0, ...theme.typography.h4 },
    h5: { margin: 0, ...theme.typography.h5 },
    h6: { margin: 0, ...theme.typography.h6 },

    // Paragraphs
    p: { margin: 0, ...theme.typography[variant] },
    '& p + p': { marginTop: '0.5em' },

    // Line breaks
    br: {
      display: 'grid',
      content: '""',
      marginTop: '0.75em',
    },

    // Links (matching editor: info.light + underline)
    '& a': {
      cursor: 'pointer',
      textDecoration: 'underline',
      color: theme.palette.info.main,
      wordBreak: 'break-all',
      overflowWrap: 'anywhere',
    },

    // Divider
    hr: {
      margin: 0,
      flexShrink: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderBottomWidth: 'thin',
      borderColor: theme.palette.divider,
    },

    // Lists (matching editor: inside list-style)
    // whiteSpace reset prevents preserved newlines between <li> tags from
    // being included in clipboard data, which causes Lexical to insert
    // extra empty list items on paste.
    '& ul, & ol': {
      margin: 0,
      whiteSpace: 'normal',
      '& li': {
        lineHeight: 2,
      },
    },
    '& ol': { listStyle: 'decimal inside' },
    '& ul': { listStyle: 'inside' },

    // Blockquote
    '& blockquote': {
      lineHeight: 1.5,
      fontSize: '1.5em',
      margin: '40px auto',
      position: 'relative',
      fontFamily: 'Georgia, serif',
      padding: theme.spacing(3, 3, 3, 8),
      color: theme.palette.text.secondary,
      borderRadius: Number(theme.shape.borderRadius) * 2,
      backgroundColor: theme.palette.background.neutral,
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
      '& p, & span': {
        marginBottom: 0,
        fontSize: 'inherit',
        fontFamily: 'inherit',
      },
      '&:before': {
        left: 16,
        top: -8,
        display: 'block',
        fontSize: '3em',
        content: '"\\201C"',
        position: 'absolute',
        color: theme.palette.text.disabled,
      },
    },

    // Code blocks
    '& pre, & pre > code': {
      fontSize: 16,
      overflowX: 'auto',
      whiteSpace: 'pre',
      padding: theme.spacing(2),
      color: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: lightMode ? theme.palette.grey[900] : alpha(theme.palette.grey[500], 0.16),
    },

    // Inline code (matching editor)
    '& code': {
      ...theme.typography[variant],
      fontFamily: 'monospace',
      backgroundColor: theme.palette.background.neutral,
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(0.25, 0.5),
      '&.hljs': { padding: 0, backgroundColor: 'transparent' },
    },

    // Tables
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      border: `1px solid ${theme.palette.divider}`,
      'th, td': {
        padding: theme.spacing(1),
        border: `1px solid ${theme.palette.divider}`,
      },
      'tbody tr:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.neutral,
      },
    },

    // Checkbox
    input: {
      '&[type=checkbox]': {
        position: 'relative',
        cursor: 'pointer',
        '&:before': {
          content: '""',
          top: -2,
          left: -2,
          width: 17,
          height: 17,
          borderRadius: 3,
          position: 'absolute',
          backgroundColor: theme.palette.grey[lightMode ? 300 : 700],
        },
        '&:checked': {
          '&:before': {
            backgroundColor: theme.palette.primary.main,
          },
          '&:after': {
            content: '""',
            top: 1,
            left: 5,
            width: 4,
            height: 9,
            position: 'absolute',
            transform: 'rotate(45deg)',
            border: `solid ${theme.palette.common.white}`,
            borderWidth: '0 2px 2px 0',
          },
        },
      },
    },

    // Strikethrough
    del: { textDecoration: 'line-through' },

    // Underline (MDX editor produces <u> tags)
    u: { textDecoration: 'underline' },
  }
})
