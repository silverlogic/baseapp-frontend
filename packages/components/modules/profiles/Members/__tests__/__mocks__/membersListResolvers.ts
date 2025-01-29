import { ProfileItemFragment } from '../../../graphql/queries/ProfileItem'

export const mockResolvers = {
  UserMembersListFragment: {
    id: 'test-user-id',
    members: {
      edges: [
        {
          node: {
            id: 'member-1',
            role: 'ADMIN',
            status: 'ACTIVE',
            user: {
              id: 'user-1',
              profile: {
                id: 'profile-1',
                name: 'John Doe',
                image: { url: 'https://example.com/john.jpg' },
                urlPath: { path: '/john-doe' },
                ...ProfileItemFragment,
              },
            },
          },
        },
        // ... other members
      ],
      pageInfo: {
        hasNextPage: true,
        endCursor: 'cursor',
      },
      totalCount: 3,
    },
  },
}
