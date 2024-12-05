import axios from '../axios'

export class WagtailAPI {
  static baseURL = `${process.env.NEXT_PUBLIC_WAGTAIL_API_BASE_URL}`

  static axios = axios
}
