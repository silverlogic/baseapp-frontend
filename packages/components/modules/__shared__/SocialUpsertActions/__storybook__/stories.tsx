import type { Meta, StoryObj } from '@storybook/react'

import SocialUpsertActions from '..'

const meta: Meta<typeof SocialUpsertActions> = {
  title: '@baseapp-frontend | components/Shared/SocialUpsertActions',
  component: SocialUpsertActions,
}

export default meta

type Story = StoryObj<typeof SocialUpsertActions>

export const DefaultSocialUpsertActions: Story = {
  name: 'Default SocialUpsertActions',
}
