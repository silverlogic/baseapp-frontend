import { WagtailAPI } from '..'
import { IPage } from '../PagesAPI/types'

export class PagePreviewAPI extends WagtailAPI {
  static namespace = `page_preview`

  static get(token: string, contentType: string): Promise<IPage> {
    return this.axios.get(`${this.baseURL}/${this.namespace}/`, {
      params: {
        token,
        contentType,
      },
    })
  }
}
