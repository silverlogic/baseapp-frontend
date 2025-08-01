import { ArchiveIcon, PenEditIcon } from '@baseapp-frontend/design-system/components/web/icons'

import type { Meta, StoryObj } from '@storybook/react'

import ActionsOverlay from '..'
import { HOVER_OVERLAY_MODES } from '../constants'
import ActionsOverlayOnButton from './ActionsOverlayOnButton'

const meta: Meta<typeof ActionsOverlayOnButton> = {
  title: '@baseapp-frontend | components/Shared/ActionsOverlay',
  component: ActionsOverlayOnButton,
}

export default meta

type Story = StoryObj<typeof ActionsOverlay>

export const DefaultActionsOverlay: Story = {
  name: 'ActionsOverlay',
  args: {
    title: 'Button',
    showDeleteButton: true,
    handleDeleteItem: () => {},
    offsetRight: 0,
    offsetTop: 0,
    ContainerProps: {
      sx: { maxWidth: 'max-content' },
    },
    actions: [
      {
        label: 'Archive',
        icon: <ArchiveIcon />,
        onClick: () => {},
        hasPermission: true,
        closeOnClick: true,
      },
    ],
  },
}

export const ActionsOverlayWithThreeDotsMenu: Story = {
  name: 'ActionsOverlay with ThreeDotsMenu',
  args: {
    title: 'Button',
    showDeleteButton: true,
    isDeletingItem: false,
    handleDeleteItem: () => {},
    ContainerProps: {
      flexDirection: 'row-reverse',
    },
    hoverOverlayMode: HOVER_OVERLAY_MODES.threeDotsMenu,
    actions: [
      {
        label: 'Edit',
        icon: <PenEditIcon />,
        onClick: () => {},
        hasPermission: true,
        closeOnClick: true,
      },
    ],
  },
}
