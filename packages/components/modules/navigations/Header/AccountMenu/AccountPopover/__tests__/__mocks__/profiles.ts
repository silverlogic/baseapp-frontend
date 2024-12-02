import { MinimalProfile } from '@baseapp-frontend/authentication'

import { faker } from '@faker-js/faker'

export const mockUserProfileFactory = (id: string) => {
  return {
    id,
    name: faker.person.fullName(),
    image: faker.image.avatar(),
    urlPath: faker.internet.url(),
  }
}

export const mockProfilesListFactory = (size: number, userProfile: MinimalProfile) => {
  return {
    data: {
      me: {
        profiles: {
          edges: [
            {
              node: {
                id: userProfile.id,
                name: userProfile.name,
                image: {
                  url: userProfile.image,
                },
                urlPath: {
                  path: userProfile.urlPath,
                },
              },
            },
            ...Array.from({ length: size }).map((_, index) => ({
              node: {
                id: `profile-${index}`,
                name: faker.person.fullName(),
                image: {
                  url: faker.image.avatar(),
                },
                urlPath: {
                  path: faker.internet.url(),
                },
              },
            })),
          ],
        },
      },
    },
  }
}

export const mockUserProfileData = mockUserProfileFactory('user-profile-1')

export const emptyMockUserProfileData = null
