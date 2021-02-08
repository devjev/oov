namespace OovCore.Validate

module Validate =
    open OovCore
    open OovCore.Utils
    open DocumentFormat.OpenXml.Validation
    open DocumentFormat.OpenXml.Packaging

    let private makeMetadata fname ftype stream =
        { FileName = fname
          FileType = ftype
          FileHash = stream |> Utils.Hash.streamAsString
          ValidationDateTime = System.DateTime.UtcNow }

    let private convertErrorType (errorType: ValidationErrorType): OovCore.ValidationErrorType =
        match errorType with
        | ValidationErrorType.MarkupCompatibility -> MarkupCompatibility
        | ValidationErrorType.Package -> Package
        | ValidationErrorType.Semantic -> Semantic
        | ValidationErrorType.Schema -> Schema
        | _ -> UnknownErrorType

    let private validateWordStream (fname: string) (stream: System.IO.Stream) =
        // Make sure you force the stream to 0 position if it already was read
        stream.Seek(0L, System.IO.SeekOrigin.Begin)
        |> ignore

        use buf = new System.IO.MemoryStream()
        stream.CopyTo buf
        use doc = WordprocessingDocument.Open(buf, false)

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
            makeMetadata fname <| FileType.get fname <| buf

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
