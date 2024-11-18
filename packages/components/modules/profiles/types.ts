export interface Profile {
    id: number
    name: string
    image: {
      fullSize: string
      // Add other optional sizes?
    }
    url_path: string
}