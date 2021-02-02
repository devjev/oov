import * as appPackage from '../../package.json'

export class Core {
  constructor() {}

  async getHistory<T extends HistoryRecord>(): Promise<T[]> {
    console.log({ endpoint: this.historyEndpoint.href })
    const response = await fetch(this.historyEndpoint.href)
    const json = await response.json()
    return json
  }

  async getByHash(hash: string): Promise<any> {
    const queryUrl = new URL(`?hash=${hash}`, this.queryEndpoint)
    const response = await fetch(queryUrl.href)
    return await response.json()
  }

  protected get endpoint(): URL {
    return new URL(appPackage.config.endpoint)
  }

  protected get historyEndpoint(): URL {
    const path = appPackage.config.history
    return new URL(path, this.endpoint)
  }

  protected get queryEndpoint(): URL {
    const path = appPackage.config.query
    return new URL(path, this.endpoint)
  }
}

export interface HistoryRecord {
  hash: string
  fileName: string
}
