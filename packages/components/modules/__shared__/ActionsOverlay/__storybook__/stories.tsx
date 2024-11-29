import { ArchiveIcon } from '@baseapp-frontend/design-system'

import type { Meta, StoryObj } from '@storybook/react'

import ActionsOverlay from '..'
import ActionsOverlayOnButton from './ActionsOverlayOnButton'

const meta: Meta<typeof ActionsOverlay> = {
  title: '@baseapp-frontend | components/Shared/ActionsOverlay',
  component: ActionsOverlayOnButton,
}

export default meta

type Story = StoryObj<typeof ActionsOverlay>

export const DefaultActionsOverlay: Story = {
  name: 'ActionsOverlay',
  args: {
    title: 'Button',
    enableDelete: true,
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
