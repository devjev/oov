namespace OovCore

open System.IO
open OovCore.Validate

type StreamOoxmlValidation(fileName: string, payload: Stream) =
    interface OovCore.IValidation with
        member _.Validate() = Validate.stream fileName payload
