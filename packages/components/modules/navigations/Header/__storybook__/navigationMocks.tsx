import {
  FavoriteIcon,
  MentionIcon,
  MenuIcon,
  PenEditIcon,
  UISettings,
} from '@baseapp-frontend/design-system'

export const themeSettingsMock: UISettings = {
  themeMode: 'light',
  themeContrast: 'default',
  themeLayout: 'vertical',
  themeColorPresets: 'default',
  themeStretch: false,
}

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
