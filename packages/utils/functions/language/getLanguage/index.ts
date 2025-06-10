import { getItem } from 'expo-secure-store'

import { LANGUAGE_COOKIE_NAME } from '../../../constants/cookie'
import { getCookie } from '../../cookie'
import { isMobilePlatform } from '../../os'

export const getLanguage = (languageKey = LANGUAGE_COOKIE_NAME) => {
  if (isMobilePlatform()) {
    return getItem(languageKey)
  }
  return getCookie<string>(languageKey)
}
