export const profileSettingsMockData = {
  data: {
    target: {
      __typename: 'Profile',
      id: 'profile-123',
      status: 'ACTIVE',
      name: 'John Doe',
      biography: 'John Doe is a software engineer at Google.',
      image: null,
      bannerImage: null,
      isFollowedByMe: false,
      followersCount: 0,
      followingCount: 0,
      canChange: true,
      urlPath: {
        path: '/johndoes',
      },
      owner: {
        phoneNumber: '+15551234567',
      },
      isBlockedByMe: false,
    },
  },
}

export const profileSettingsTextUpdateData = {
  data: {
    target: {
      __typename: 'Profile',
      id: `profile-123`,
      status: 'ACTIVE',
      name: 'Jane Smith',
      biography: 'Jane Smith is a software engineer at Microsoft.',
      image: {
        url: null,
      },
      bannerImage: {
        url: null,
      },
      isFollowedByMe: false,
      followersCount: 0,
      followingCount: 0,
      canChange: true,
      urlPath: {
        path: '/janesmith',
      },
      owner: {
        phoneNumber: '+1123456789',
      },
      isBlockedByMe: false,
    },
  },
}

export const profileSettingsImageUpdateData = {
  data: {
    target: {
      __typename: 'Profile',
      id: `profile-123`,
      status: 'ACTIVE',
      name: 'John Doe',
      biography: 'John Doe is a software engineer at Google.',
      image: {
        url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
      },
      bannerImage: {
        url: null,
      },
      isFollowedByMe: false,
      followersCount: 0,
      followingCount: 0,
      canChange: true,
      urlPath: {
        path: '/johndoes',
      },
      owner: {
        phoneNumber: '+1234567890',
      },
      isBlockedByMe: false,
    },
  },
}

export const profileSettingsImageRemoveData = {
  data: {
    target: {
      __typename: 'Profile',
      id: `profile-123`,
      status: 'ACTIVE',
      name: 'John Doe',
      biography: 'John Doe is a software engineer at Google.',
      image: {
        url: null,
      },
      bannerImage: {
        url: null,
      },
      isFollowedByMe: false,
      followersCount: 0,
      followingCount: 0,
      canChange: true,
      urlPath: {
        path: '/johndoes',
      },
      owner: {
        phoneNumber: '+1234567890',
      },
      isBlockedByMe: false,
    },
  },
}

export const profileSettingsBannerUpdateData = {
  data: {
    target: {
      __typename: 'Profile',
      id: `profile-123`,
      status: 'ACTIVE',
      name: 'John Doe',
      biography: 'John Doe is a software engineer at Google.',
      image: {
        url: null,
      },
      bannerImage: {
        url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
      },
      isFollowedByMe: false,
      followersCount: 0,
      followingCount: 0,
      canChange: true,
      urlPath: {
        path: '/johndoes',
      },
      owner: {
        phoneNumber: '+1234567890',
      },
      isBlockedByMe: false,
    },
  },
}

export const profileSettingsBannerRemoveData = {
  data: {
    target: {
      __typename: 'Profile',
      id: `profile-123`,
      status: 'ACTIVE',
      name: 'John Doe',
      biography: 'John Doe is a software engineer at Google.',
      image: {
        url: null,
      },
      bannerImage: {
        url: null,
      },
      isFollowedByMe: false,
      followersCount: 0,
      followingCount: 0,
      canChange: true,
      urlPath: {
        path: '/johndoes',
      },
      owner: {
        phoneNumber: '+1234567890',
      },
      isBlockedByMe: false,
    },
  },
}

export const mockDataWithBanner = {
  data: {
    target: {
      __typename: 'Profile',
      id: 'profile-123',
      status: 'ACTIVE',
      name: 'John Doe',
      biography: 'John Doe is a software engineer at Google.',
      image: {
        url: 'http://localhost:8000/media/profile_images/5dfe5729-1730-4fe6-b22a-a0f15f65a754.png.96x96_q85.png',
      },
      bannerImage: {
        url: 'http://localhost:8000/media/banner_images/test-banner.png',
      },
      isFollowedByMe: false,
      followersCount: 0,
      followingCount: 0,
      canChange: true,
      urlPath: {
        path: '/johndoes',
      },
      owner: {
        phoneNumber: '+1234567890',
      },
      isBlockedByMe: false,
    },
  },
}
