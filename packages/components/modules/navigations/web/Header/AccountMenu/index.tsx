'use client'

import { FC } from 'react'

import { User as BaseUser, useJWTUser } from '@baseapp-frontend/authentication'
import { JWTContent } from '@baseapp-frontend/utils'

import { Button } from '@mui/material'

import AccountPopover from './AccountPopover'
import { AccountMenuProps } from './types'

const AccountMenu: FC<AccountMenuProps> = ({
  AccountPopoverProps = {},
  additionalComponent,
  children,
  loginButtonLabel = 'Login',
  loginButtonProps,
  onLoginClick,
  onRegisterClick,
  registerButtonLabel = 'Register',
  registerButtonProps,
}) => {
  const { user } = useJWTUser<BaseUser & JWTContent>()

  const renderAdditionalComponent = () => {
    if (additionalComponent) return additionalComponent
    return <div />
  }

  const renderHeaderContent = () => {
    if (children) return children
    return <div />
  }

  if (!user) {
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
      <AccountPopover {...AccountPopoverProps} />
    </div>
  )
}

export default AccountMenu
