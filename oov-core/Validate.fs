namespace OovCore.Validate


module Validate =
    open System.Security.Cryptography
    open OovCore
    open OovCore.Utils
    open DocumentFormat.OpenXml.Validation
    open DocumentFormat.OpenXml.Packaging

    let private sha256 = SHA256.Create()

    let private getFileHash fname =
        use fh = System.IO.File.OpenRead(fname)
        let result = sha256.ComputeHash(fh) |> List.ofArray
        fh.Close()
        result

    let rec private bytesToString (bytes: byte list) =
        match bytes with
        | head :: tail -> head.ToString("x2") + (tail |> bytesToString)
        | [] -> ""

    let private makeMetadata fname =
        { FileName = fname
          FileType = FileType.get fname
          FileHash = fname |> getFileHash |> bytesToString
          //   FileHash = "poopies"
          ValidationDateTime = System.DateTime.UtcNow }

    let private convertErrorType (errorType: ValidationErrorType): OovCore.ValidationErrorType =
        match errorType with
        | ValidationErrorType.MarkupCompatibility -> MarkupCompatibility
        | ValidationErrorType.Package -> Package
        | ValidationErrorType.Semantic -> Semantic
        | ValidationErrorType.Schema -> Schema
        | _ -> UnknownErrorType

    let private validateWordStream (fname: string) (stream: System.IO.Stream) =
        use doc =
            WordprocessingDocument.Open(stream, false)

        let validator = OpenXmlValidator()

        let errors =
            seq {
                for originalError in validator.Validate(doc) ->
                    { Description = originalError.Description
                      ErrorType = originalError.ErrorType |> convertErrorType
                      Id = originalError.Id
                      Xml = originalError.Node.OuterXml }
            }
            |> List.ofSeq
        // collect all errors - we are going to use the file again to calculate
        // the hash

        doc.Close()

        let metadata = fname |> makeMetadata

        let status =
            if (Seq.length errors) > 0 then
                Fail
            else
                Success

        let result =
            { Metadata = metadata
              Errors = errors |> List.ofSeq
              Status = status }

        result

    let streamWithName (fname: string) (stream: System.IO.Stream) =
        match FileType.get fname with
        | Document -> validateWordStream fname stream
        | _ ->
            { Metadata = fname |> makeMetadata
              Errors = List.empty
              Status = Unavailable }

    let streamWithType (ooxmlType: OoxmlFileType) (stream: System.IO.Stream) =
        match ooxmlType with
        | Document -> validateWordStream "unavailable" stream
        | _ ->
            { Metadata = "unavailable" |> makeMetadata
              Errors = List.empty
              Status = Unavailable }

    let file (fname: string) =
        use ooxmlStream =
            System.IO.File.Open(fname, System.IO.FileMode.Open)

        streamWithName fname ooxmlStream
