namespace OovCore.Utils

module FileType =
    open MimeTypes
    open OovCore

    let private _docxMimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    let private _xlsxMimeType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    let private _pptxMimeType =
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"

    let private _legacyDocMimeType = "application/msword"
    let private _legacyXlsMimeType = "application/vnd.ms-excel"
    let private _legacyPptMimeType = "application/vnd.ms-powerpoint"


    let contentType (fname: string) =
        let extension = System.IO.Path.GetExtension(fname)
        MimeTypeMap.GetMimeType extension

    // A private helper active pattern, which allows to match against predefined
    // variables, without pattern matching.
    let private (|Equals|_|) arg x = if (arg = x) then Some() else None

    let get (fname: string) =
        match contentType fname with
        | Equals _docxMimeType -> Document
        | Equals _xlsxMimeType -> Spreadsheet
        | Equals _pptxMimeType -> Presentation
        | Equals _legacyDocMimeType
        | Equals _legacyXlsMimeType
        | Equals _legacyPptMimeType -> LegacyFileType
        | _ -> UnknownFileType
