import { Meta, StoryObj } from '@storybook/react'

import ProfileComponentWithQuery from './ProfileComponentWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof ProfileComponentWithQuery> = {
  title: '@baseapp-frontend | components/Profiles/ProfileComponent',
  component: ProfileComponentWithQuery,
  decorators: [
    (Story) => (
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target as HTMLElement
            if ((e.target as HTMLElement).tagName === 'A' || target.closest('a')) {
              e.preventDefault()
            }
            if (target && target.innerText === 'Share profile') {
              alert('Profile URL copied to clipboard!')
            }
          }
        }}
        onClick={(e) => {
          const target = e.target as HTMLElement
          if ((e.target as HTMLElement).tagName === 'A' || target.closest('a')) {
            e.preventDefault()
          }
          if (target && target.innerText === 'Share profile') {
            alert('Profile URL copied to clipboard!')
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ProfileComponentWithQuery>

export const UnfollowedProfile: Story = {
  name: 'Unfollowed Profile',
  args: {
    currentProfileId: 'profile-2',
  },
  parameters: {
    mockResolvers,
  },
}

export const FollowedProfile: Story = {
  name: 'Followed Profile',
  args: {
    currentProfileId: 'profile-2',
  },
  parameters: {
    mockResolvers: {
      Profile: () => ({
        ...mockResolvers.Profile(),
        isFollowedByMe: true,
      }),
    },
  },
}

export const ProfileOwner: Story = {
  name: 'Profile Owner',
  args: {
    currentProfileId: 'profile-1',
  },
  parameters: {
    mockResolvers,
  },
}
