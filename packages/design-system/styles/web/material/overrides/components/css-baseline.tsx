import { Components, Theme, alpha } from '@mui/material/styles'

export function cssBaseline(theme: Theme): Pick<Components<Theme>, 'MuiCssBaseline'> {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root, #__next': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom',
        },
        // MDXEditor Radix link dialog — styled to match MUI ConfirmDialog
        '[data-radix-popper-content-wrapper] div[role="dialog"]': {
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius * 2,
          border: 'none',
          boxShadow: theme.customShadows.dialog,
          padding: theme.spacing(3),
        },
        '[data-radix-popper-content-wrapper] div[role="dialog"] form': {
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(1),
          overflow: 'hidden',
          padding: 0,
          '& > div': {
            minWidth: 0,
          },
        },
        '[data-radix-popper-content-wrapper] div[role="dialog"] label': {
          ...theme.typography.body2,
          color: theme.palette.text.secondary,
          marginBottom: theme.spacing(0.25),
        },
        // Button container — extra spacing above to separate from inputs
        '[data-radix-popper-content-wrapper] div[role="dialog"] form > div:last-of-type': {
          marginTop: theme.spacing(1),
        },
        '[data-radix-popper-content-wrapper] div[role="dialog"] input': {
          ...theme.typography.body2,
          width: '100% !important',
          minWidth: 0,
          boxSizing: 'border-box',
          padding: theme.spacing(1, 1.5),
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          outline: 'none',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          '&:focus': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        },
        '[data-radix-popper-content-wrapper] div[role="dialog"] button[type="submit"]': {
          ...theme.typography.button,
          backgroundColor:
            theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.common.white,
          color:
            theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[800],
          border: 'none',
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(0.75, 2),
          cursor: 'pointer',
          transition: theme.transitions.create('background-color'),
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400],
          },
        },
        '[data-radix-popper-content-wrapper] div[role="dialog"] button[type="reset"]': {
          ...theme.typography.button,
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          border: 'none',
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(0.75, 2),
          cursor: 'pointer',
          transition: theme.transitions.create('background-color'),
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        // Link preview popup (has no form, just anchor + action buttons)
        '[data-radix-popper-content-wrapper] div[role="dialog"]:has(> a)': {
          padding: theme.spacing(1, 1.5),
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing(0.5),
        },
        '[data-radix-popper-content-wrapper] div[role="dialog"] > a': {
          ...theme.typography.body2,
          color: theme.palette.text.primary,
          textDecoration: 'none',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing(0.5),
          '& svg': {
            color: theme.palette.text.primary,
            flexShrink: 0,
            width: 20,
            height: 20,
          },
        },
        // Action buttons in link preview (edit, copy, remove)
        '[data-radix-popper-content-wrapper] div[role="dialog"] > button': {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(0.5),
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          transition: theme.transitions.create('background-color'),
          '& svg': {
            color: theme.palette.text.primary,
            width: 20,
            height: 20,
          },
          '&:hover': {
            backgroundColor: theme.palette.background.neutral,
          },
        },
        // Toolbar button tooltips
        '[data-radix-popper-content-wrapper] div[role="tooltip"]': {
          ...theme.typography.caption,
          backgroundColor: theme.palette.grey[800],
          color: theme.palette.common.white,
          borderRadius: theme.shape.borderRadius / 2,
          padding: theme.spacing(0.5, 1),
          border: 'none',
          boxShadow: 'none',
        },
        // Hide the popover arrow
        '[data-radix-popper-content-wrapper] div[role="dialog"] svg.popoverArrow, [data-radix-popper-content-wrapper] div[role="dialog"] + span, [data-radix-popper-content-wrapper] svg polygon':
          {
            display: 'none',
          },
      },
    },
  }
}
