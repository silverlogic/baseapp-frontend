import { FavoriteIcon, MentionIcon, MenuIcon, PenEditIcon } from '@baseapp-frontend/design-system'

export const navDataMock = [
  {
    subheader: 'BASEAPP',
    items: [{ title: 'Home', icon: <MenuIcon /> }],
  },
  {
    subheader: 'BASIC',
    items: [
      { title: 'Feature Requests', icon: <MentionIcon /> },
      { title: 'Flat Pages', icon: <PenEditIcon /> },
      { title: 'Feedback', icon: <FavoriteIcon /> },
    ],
  },
]
