import React, { useEffect, useState } from 'react'

import { ACCESS_KEY_NAME } from '@baseapp-frontend/utils/constants/jwt'

import { StoryContext, StoryFn } from '@storybook/react'
import Cookies from 'js-cookie'

import jwt from '../__mocks__/jwt.json'

const withTokenSetup = (Story: StoryFn, context: StoryContext) => {
  const [isTokenSet, setIsTokenSet] = useState(false)

  useEffect(() => {
    if (context.parameters.userType === 'valid') {
      Cookies.set(ACCESS_KEY_NAME, jwt.token)
    } else {
      Cookies.remove(ACCESS_KEY_NAME)
    }
    setTimeout(() => {
      setIsTokenSet(true)
    }, 100)
  }, [context.parameters.userType])

  if (!isTokenSet) {
    return <div />
  }

  return <Story />
}

export default withTokenSetup
