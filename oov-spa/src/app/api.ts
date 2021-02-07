import * as appPackage from '../../package.json'
import * as lf from 'localforage'

export interface HistoryRecord {
  hash: string
  fileName: string
}

export interface AppConfig {
  view: 'new' | 'view'
  config: {
    theme: 'light' | 'dark'
  }
}

export interface ValidationResult {
  errors: ValidationError[]
  metadata: ValidationMetadata
  status: ValidationStatus
}

export interface ValidationStatus {
  isFail: boolean
  isSuccess: boolean
  isUnavailable: boolean
  tag: number
}

export interface ValidationMetadata {
  fileHash: string
  fileName: string
  fileType: OoxmlFileType
  validationDateTime: string
}

export interface OoxmlFileType {
  isDocument: boolean
  isLegacyFileType: boolean
  isPresentation: boolean
  isSpreadhsheet: boolean
  isUnknownFileType: false
  tag: number
}

export interface ValidationError {
  description: string
  errorType: ValidationErrorType
  id: string
  xml: string
}

export interface ValidationErrorType {
  isMarkupCompatibility: boolean
  isPackage: boolean
  isSchema: boolean
  isSemantic: boolean
  isUnknownErrorType: boolean
  tag: number
}

export async function getConfig(): Promise<AppConfig> {
  const config: AppConfig | null = await lf.getItem('config')
  if (config !== null) {
    return config
  } else {
    const defaultConfig: AppConfig = {
      view: 'new',
      config: {
        theme: 'light',
      },
    }
    await setConfig(defaultConfig)
    return defaultConfig
  }
}

export async function setConfig(cfg: AppConfig): Promise<void> {
  await lf.setItem('config', cfg)
}

export async function getHistory<T extends HistoryRecord>(): Promise<T[]> {
  const response = await fetch(historyEndpoint().href)
  const json = await response.json()
  return json
}

export async function getByHash(hash: string): Promise<ValidationResult> {
  const queryUrl = new URL(`?hash=${hash}`, queryEndpoint())
  const response = await fetch(queryUrl.href)
  const json = await response.json()
  return json.value
}

export function invertTheme(theme: 'light' | 'dark'): 'light' | 'dark' {
  switch (theme) {
    case 'light':
      return 'dark'
    case 'dark':
      return 'light'
  }
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
