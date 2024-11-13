import { WagtailAPI } from '..'
import { IPage } from './types'

export class PagesAPI extends WagtailAPI {
  static namespace = `base/pages`

  static getPageByPath(path: string, extraParams: any = {}): Promise<IPage> {
    return this.axios.get(`${this.baseURL}/${this.namespace}/path/`, {
      params: {
        fields: '*',
        html_path: path,
        ...extraParams,
      },
    })
  }

  static getPage(id: number, type: string): Promise<IPage> {
    return this.axios.get(`${this.baseURL}/${this.namespace}/${id}/`, {
      params: {
        fields: '*',
        type,
      },
    })
  }
}
