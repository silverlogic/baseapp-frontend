import { Box, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

export const EditorContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'minHeight' && prop !== 'hasBorder',
})<{ minHeight?: number | string; hasBorder?: boolean }>(({ theme, minHeight, hasBorder }) => ({
  ...(hasBorder && {
    borderRadius: 8,
    border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
    '&:hover, &:focus-within': {
      transition: 'border-color 0.25s ease',
      borderColor: theme.palette.text.primary,
    },
  }),
  '& .container': {
    border: '1px solid transparent',
    paddingBottom: theme.spacing(0.625),
    width: '100%',
    maxWidth: '100%',
    color: theme.palette.text.primary,
    ...(minHeight != null && { minHeight }),
    ...theme.typography.body2,
  },
  '& .mdxeditor-root-contenteditable > div[class*="placeholder"]': {
    color: theme.palette.text.disabled,
    // ...theme.typography.body2,
  },
  '& .mdxeditor-popup-container': {
    zIndex: 1000,
  },
  '& .mdxeditor': {
    width: '100%',
    display: 'grid',
  },
  '& .mdxeditor-toolbar': {
    maxWidth: '100%',
    flexWrap: 'wrap',
    gap: 0,
    backgroundColor: 'transparent',
  },
  '& .mdxeditor-toolbar button': {
    cursor: 'pointer',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.background.neutral,
    },
  },
  '& div[aria-label="toggle group"]': {
    gap: theme.spacing(1),
  },
  '& .mdxeditor-toolbar > div[role="separator"]': {
    display: 'none',
  },
  '& .mdxeditor-toolbar svg': {
    color: theme.palette.background.neutral,
    width: 20,
    height: 20,
  },
  '& .mdxeditor:focus-within .mdxeditor-toolbar svg': {
    color: theme.palette.text.primary,
  },
  '& .mdxeditor-toolbar button[data-state="on"]': {
    backgroundColor: alpha(theme.palette.background.neutral, 0.1),
  },
  '& .mdxeditor:focus-within .mdxeditor-toolbar button[data-state="on"]': {
    backgroundColor: theme.palette.background.neutral,
  },
  '& div[aria-label="editable markdown"] li::after': {
    top: 7,
  },
  '& .mdxeditor-root-contenteditable ul li[role="checkbox"]': {
    textIndent: '1.8rem',
    marginInlineStart: 0,
    padding: 0,
  },
  '& .mdxeditor-root-contenteditable ul li[role="checkbox"]::before': {
    boxShadow: 'none',
  },
  '& .mdxeditor-root-contenteditable li[role="checkbox"]::before': {
    transform: 'translate(0px, 4px)',
  },
  '& .mdxeditor-root-contenteditable li[role="checkbox"][aria-checked="true"]::before': {
    backgroundColor: theme.palette.primary.main,
    border: 'none',
  },
  '& .mdxeditor ol': {
    listStyle: 'decimal inside',
  },
  '& .mdxeditor ul': {
    listStyle: 'inside',
  },
  '& .mdxeditor h2': {
    fontSize: '1.5em',
    fontWeight: 700,
  },
  // Links in content
  '& .mdxeditor a': {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  // Inline code
  '& .mdxeditor code': {
    ...theme.typography.body2,
    fontFamily: 'monospace',
    backgroundColor: theme.palette.background.neutral,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.25, 0.5),
    '& *': {
      backgroundColor: 'transparent',
    },
  },
}))

export const EditorPlaceholder = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
}))

export const PlaceholderBlock = styled(Box)({
  width: '100%',
  backgroundColor: 'transparent',
})
