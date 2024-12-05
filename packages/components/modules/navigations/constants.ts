export const HEADER_HEIGHT = {
  MOBILE: 64,
  DESKTOP: 80,
  DESKTOP_OFFSET: 80 - 16,
}

export const NAV_WIDTH = {
  VERTICAL: 280,
  MINI: 88,
}

export const NAV_PADDING_UP_TO_LG = {
  horizontal: {
    top: HEADER_HEIGHT.MOBILE * 2 + 40,
    bottom: 15,
  },
  centered: {
    top: HEADER_HEIGHT.MOBILE + 24,
    bottom: 0,
  },
  vertical: {
    top: HEADER_HEIGHT.DESKTOP + 8,
    bottom: HEADER_HEIGHT.DESKTOP + 8,
  },
}

export const NAV_PADDING_DOWN_TO_LG = {
  horizontal: {
    top: HEADER_HEIGHT.MOBILE + 24,
    bottom: 10,
  },
  centered: {
    top: HEADER_HEIGHT.MOBILE + 32,
    bottom: 0,
  },
  vertical: {
    top: HEADER_HEIGHT.MOBILE + 8,
    bottom: HEADER_HEIGHT.MOBILE + 8,
  },
}
