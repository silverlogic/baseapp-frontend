'use client'

import { Box, alpha, styled } from '@mui/material'

export const RichTextBlockWrapper = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  '& > *:not(:last-child)': {
    paddingBottom: theme.spacing(2),
  },
  '& > *:first-child:empty': {
    paddingBottom: 0,
  },
  '& > img:not(:last-child), & > iframe:not(:last-child)': {
    marginBottom: theme.spacing(2),
    paddingBottom: 0,
  },
  '& p': {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    wordWrap: 'break-word',
  },
  '& :is(h1, h2, h3, h4, h5, h6)': {
    ...theme.typography.h6,
    color: theme.palette.primary.dark,
  },
  '& h2': {
    ...theme.typography.h4,
    [theme.breakpoints.up('md')]: {
      ...theme.typography.h5,
    },
  },
  '& h3': {
    ...theme.typography.h4,
    [theme.breakpoints.up('md')]: {
      ...theme.typography.h5,
    },
  },
  '& h4': {
    ...theme.typography.h5,
    [theme.breakpoints.up('md')]: {
      ...theme.typography.h6,
    },
  },
  '& a': {
    textUnderlineOffset: '2px',
    textDecoration: 'underline',
    overflowWrap: 'anywhere',
  },
  '& ol, & ul': {
    marginLeft: theme.spacing(1),
    '& li': {
      listStylePosition: 'inside',
    },
    '& p': {
      display: 'inline',
    },
  },
  '& ol': {
    listStyleType: 'decimal',
    '& ol': {
      listStyleType: 'lower-alpha',
      marginLeft: theme.spacing(3),
      '& ol': {
        listStyleType: 'lower-roman',
        '& ol': {
          listStyleType: 'decimal',
          '& ol': {
            // This is the deepest level of ol.
            listStyleType: 'lower-alpha',
          },
        },
      },
    },
  },
  '& ul': {
    listStyleType: 'disc',
    '& ul': {
      listStyleType: 'circle',
      marginLeft: theme.spacing(3),
      '& ul': {
        listStyleType: 'square',
      },
    },
  },
  '& img': {
    borderRadius: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.spacing(3),
    },
  },
  '& img.full-width': {
    width: '100%',
    height: 'auto',
  },
  '& img.right': {
    [theme.breakpoints.up('sm')]: {
      float: 'right',
      marginLeft: theme.spacing(4),
      borderRadius: theme.spacing(1.5),
    },
  },
  '& img.left': {
    [theme.breakpoints.up('sm')]: {
      float: 'left',
      marginRight: theme.spacing(4),
      borderRadius: theme.spacing(1.5),
    },
  },
  '& img.centered': {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  '& iframe': {
    width: '100%',
    height: 'auto',
    aspectRatio: '16 / 9',
    borderRadius: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.spacing(3),
    },
  },
  '& blockquote': {
    borderLeft: `4px solid ${alpha(theme.palette.text.primary, 0.5)}`,
    padding: theme.spacing(2, 0, 2, 4),
    margin: theme.spacing(2, 0),
  },
}))
