import Profile1Img from './static/profile-1.png'
import Profile2Img from './static/profile-2.png'
import Profile3Img from './static/profile-3.png'

export const mockResolvers = {
  Query: () => ({
    me: {
      profile: {
        id: 'profile-1',
        name: 'Profile 1',
        image: Profile1Img,
        urlPath: {
          path: '/profile/1',
        },
      },
      profiles: [
        {
          id: 'profile-2',
          name: 'Profile 2',
          image: Profile2Img,
          urlPath: {
            path: '/profile/2',
          },
        },
        {
          id: 'profile-3',
          name: 'Profile 3',
          image: Profile3Img,
          urlPath: {
            path: '/profile/3',
          },
        },
      ],
    },
  }),
}
