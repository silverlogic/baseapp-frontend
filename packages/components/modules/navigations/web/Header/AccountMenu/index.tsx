'use client'

import { FC, useMemo } from 'react'

import { User as BaseUser, useJWTUser } from '@baseapp-frontend/authentication'
import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'
import { JWTContent } from '@baseapp-frontend/utils'

import { Button, Divider } from '@mui/material'
import { Box } from '@mui/system'
import { useIntl } from 'react-intl'

import AccountPopover from './AccountPopover'
import VerticalFooter from './VerticalFooter'
import { CurrentProfileRow, ProfileContainer, SwitchProfileRow } from './styled'
import { AccountMenuProps } from './types'

const AccountMenu: FC<AccountMenuProps> = ({
  AccountPopoverProps = {},
  additionalComponent,
  children,
  loginButtonLabel: loginButtonLabelProp,
  loginButtonProps,
  onLoginClick,
  onRegisterClick,
  registerButtonLabel: registerButtonLabelProp,
  registerButtonProps,
  vertical = false,
}) => {
  const intl = useIntl()
  const { user } = useJWTUser<BaseUser & JWTContent>()
  const loginButtonLabel =
    loginButtonLabelProp ??
    intl.formatMessage({ id: 'navigations.accountMenu.login', defaultMessage: 'Login' })
  const registerButtonLabel =
    registerButtonLabelProp ??
    intl.formatMessage({ id: 'navigations.accountMenu.register', defaultMessage: 'Register' })
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
        <ProfileContainer>
          {children}
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
        </ProfileContainer>
      )
    }

    return (
      <SwitchProfileRow>
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
      </SwitchProfileRow>
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
        {children}
        {additionalComponent && (
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
            {additionalComponent}
          </Box>
        )}
        <Divider sx={{ borderStyle: 'solid' }} />
        <VerticalFooter AccountPopoverProps={AccountPopoverProps} />
      </Box>
    )
  }

  return (
    <CurrentProfileRow>
      {renderHeaderContent()}
      {renderAdditionalComponent()}
      <AccountPopover {...AccountPopoverProps} />
    </CurrentProfileRow>
  )
}

export default AccountMenu
