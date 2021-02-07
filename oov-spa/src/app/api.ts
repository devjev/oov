import * as appPackage from '../../package.json'

export interface HistoryRecord {
  hash: string
  fileName: string
}

export interface ValidationResult {}

export async function getHistory<T extends HistoryRecord>(): Promise<T[]> {
  const response = await fetch(historyEndpoint().href)
  const json = await response.json()
  return json
}

export async function getByHash(hash: string): Promise<any> {
  const queryUrl = new URL(`?hash=${hash}`, queryEndpoint())
  const response = await fetch(queryUrl.href)
  return await response.json()
}

function endpoint(): URL {
  return new URL(appPackage.config.endpoint)
}

function historyEndpoint(): URL {
  const path = appPackage.config.history
  return new URL(path, endpoint())
}

function queryEndpoint(): URL {
  const path = appPackage.config.query
  return new URL(path, endpoint())
}
