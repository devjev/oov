namespace OovCore

type OoxmlFileType =
    | UnknownFileType
    | LegacyFileType
    | Document
    | Spreadsheet
    | Presentation

type ValidationMetadata =
    { FileName: string
      FileType: OoxmlFileType
      FileHash: string
      ValidationDateTime: System.DateTime }

type ValidationErrorType =
    | UnknownErrorType
    | MarkupCompatibility
    | Package
    | Semantic
    | Schema

type ValidationError =
    { Description: string
      ErrorType: ValidationErrorType
      Id: string
      Xml: string }

type ValidationStatus =
    | Unavailable
    | Fail
    | Success

type ValidationResult =
    { Metadata: ValidationMetadata
      Errors: ValidationError list
      Status: ValidationStatus }

type IValidation =
    abstract member Validate: unit -> ValidationResult
