'use client'

import { FC } from 'react'

import { User as BaseUser, getUser } from '@baseapp-frontend/authentication'
import { JWTContent, isUserTokenValid } from '@baseapp-frontend/utils'

import { Button } from '@mui/material'

import { ProfilePopover } from '../../../profiles'
import { AccountMenuProps } from './types'

const AccountMenu: FC<AccountMenuProps> = ({
  children,
  onRegisterClick,
  onLoginClick,
  registerButtonLabel = 'Register',
  loginButtonLabel = 'Login',
  registerButtonProps,
  loginButtonProps,
  menuItems,
  additionalComponent,
}) => {
  const user = getUser<BaseUser & JWTContent>({ noSSR: false })
  const isUserValid = isUserTokenValid(user)

  const renderAdditionalComponent = () => {
    if (additionalComponent) return additionalComponent
    return <div />
  }

  const renderHeaderContent = () => {
    if (children) return children
    return <div />
  }

  if (!isUserValid) {
    return (
      <div className="grid w-full grid-cols-[1fr_max-content_max-content] items-center justify-center gap-1 min-lg:gap-2">
        {renderHeaderContent()}
        {onRegisterClick && onLoginClick && (
          <>
            <Button
              onClick={onRegisterClick}
              variant="outlined"
              color="inherit"
              sx={{ width: 'fit-content' }}
              {...registerButtonProps}
            >
              {registerButtonLabel}
            </Button>
            <Button onClick={onLoginClick} sx={{ width: 'fit-content' }} {...loginButtonProps}>
              {loginButtonLabel}
            </Button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="grid w-full grid-cols-[1fr_40px_40px] items-center justify-center gap-1 min-lg:gap-2">
      {renderHeaderContent()}
      {renderAdditionalComponent()}
      <ProfilePopover menuItems={menuItems} />
    </div>
  )
}

export default AccountMenu
