namespace OovCore.Validate

open System.IO


module Validate =
    open System.Security.Cryptography
    open OovCore
    open OovCore.Utils
    open DocumentFormat.OpenXml.Validation
    open DocumentFormat.OpenXml.Packaging

    let private sha256 = SHA256.Create()

    let private getFileHash (stream: Stream) =
        let result =
            sha256.ComputeHash(stream) |> List.ofArray

        result

    let rec private bytesToString (bytes: byte list) =
        match bytes with
        | head :: tail -> head.ToString("x2") + (tail |> bytesToString)
        | [] -> ""

    let private makeMetadata fname ftype stream =
        { FileName = fname
          FileType = ftype
          FileHash = stream |> getFileHash |> bytesToString
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

        let metadata =
            makeMetadata fname <| FileType.get fname <| stream

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

    let stream (fname: string) (stream: System.IO.Stream) =
        match FileType.get fname with
        | Document -> validateWordStream fname stream
        | _ ->
            { Metadata = makeMetadata fname UnknownFileType stream
              Errors = List.empty
              Status = Unavailable }

    let file (fname: string) =
        use ooxmlStream =
            System.IO.File.Open(fname, System.IO.FileMode.Open)

        stream fname ooxmlStream
