import { FC } from 'react'

import { Box, Divider } from '@mui/material'

import CurrentProfileMenu from '../../AccountPopover/CurrentProfileMenu'
import LogoutItem from '../../AccountPopover/LogoutItem'
import { PopoverContentProps } from './types'

const PopoverContent: FC<PopoverContentProps> = ({
  ProfilesList,
  ProfilesListProps = {},
  openProfilesList,
  setOpenProfilesList,
  CurrentUser,
  CurrentProfile,
  SwitchProfileMenu,
  SwitchProfileMenuProps = {},
  MenuItems,
  MenuItemsProps = {},
  handlePopoverOnClose,
  AddProfileMenuItem,
  AddProfileMenuItemProps = {},
  LogoutItemProps = {},
}) => (
  <>
    {!!ProfilesList && openProfilesList ? (
      <ProfilesList
        openSubmenu={openProfilesList}
        handleCloseSubmenu={() => setOpenProfilesList(false)}
        {...ProfilesListProps}
      />
    ) : (
      <CurrentProfileMenu
        CurrentUser={CurrentUser}
        CurrentProfile={CurrentProfile}
        SwitchProfileMenu={SwitchProfileMenu}
        SwitchProfileMenuProps={SwitchProfileMenuProps}
        MenuItems={MenuItems}
        MenuItemsProps={MenuItemsProps}
        handlePopoverOnClose={handlePopoverOnClose}
        setOpenProfilesList={setOpenProfilesList}
      />
    )}
    {Boolean(LogoutItem) && <Divider sx={{ borderStyle: 'solid' }} />}
    <Box margin={1.5} display="flex" flexDirection="column" gap={0.5}>
      {openProfilesList && AddProfileMenuItem != null && (
        <AddProfileMenuItem {...AddProfileMenuItemProps} />
      )}
      <LogoutItem handlePopoverOnClose={handlePopoverOnClose} {...LogoutItemProps} />
    </Box>
  </>
)

export default PopoverContent
