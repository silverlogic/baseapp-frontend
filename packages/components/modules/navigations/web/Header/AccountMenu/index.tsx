'use client'

import { FC, useMemo } from 'react'

import { User as BaseUser, useJWTUser } from '@baseapp-frontend/authentication'
import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'
import { JWTContent } from '@baseapp-frontend/utils'

import { Button, Divider } from '@mui/material'
import { Box } from '@mui/system'

import AccountPopover from './AccountPopover'
import VerticalFooter from './VerticalFooter'
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
  vertical = false,
}) => {
  const { user } = useJWTUser<BaseUser & JWTContent>()
  const { settings } = useUISettings()
  const isNavMini = useMemo(() => settings.themeLayout === 'mini', [settings.themeLayout])

  const renderAdditionalComponent = () => {
    if (additionalComponent) return additionalComponent
    return <div />
  }

  const renderHeaderContent = () => {
    if (children) return children
    return <div />
  }

  if (!user) {
    if (vertical) {
      return (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          {renderHeaderContent()}
          {onRegisterClick && onLoginClick && (
            <>
              <Button
                onClick={onRegisterClick}
                variant="outlined"
                color="inherit"
                fullWidth
                {...registerButtonProps}
              >
                {registerButtonLabel}
              </Button>
              <Button onClick={onLoginClick} fullWidth {...loginButtonProps}>
                {loginButtonLabel}
              </Button>
            </>
          )}
        </div>
      )
    }

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

  if (vertical) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {renderHeaderContent()}
        {renderAdditionalComponent() && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              ...(isNavMini
                ? {
                    padding: (theme) => theme.spacing(0),
                    margin: (theme) => theme.spacing(0, 0.5),
                  }
                : {
                    padding: (theme) => theme.spacing(0, 2, 0, 2.5),
                    margin: 0,
                  }),
            }}
          >
            {renderAdditionalComponent()}
          </Box>
        )}
        <Divider sx={{ borderStyle: 'solid' }} />
        <VerticalFooter AccountPopoverProps={AccountPopoverProps} />
      </Box>
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
