namespace OovCore

open System.IO
open OovCore.Validate

type OoxmlStreamDefinition =
    | StreamWithName of fileName: string * payload: Stream
    | StreamWithType of fileType: OoxmlFileType * payload: Stream

type StreamOoxmlValidation(ooxml: OoxmlStreamDefinition) =
    interface OovCore.IValidation with
        member _.Validate() =
            match ooxml with
            | StreamWithName (fileName, payload) -> Validate.streamWithName fileName payload
            | StreamWithType (fileType, payload) -> Validate.streamWithType fileType payload
