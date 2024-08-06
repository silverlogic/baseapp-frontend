import { HttpResponse, http } from 'msw'

export const handlers = [
  http.get('/users/me', () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      avatar: {
        small:
          'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
      },
    })
  }),
]
