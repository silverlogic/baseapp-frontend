import { WagtailAPI } from '..'
import { Page } from '../PagesAPI/types'

export class PagePreviewAPI extends WagtailAPI {
  static namespace = `base/page_preview`

  static get(token: string, contentType: string): Promise<Page> {
    return this.axios.get(`${this.baseURL}/${this.namespace}/`, {
      params: {
        token,
        contentType,
      },
    })
  }
}
