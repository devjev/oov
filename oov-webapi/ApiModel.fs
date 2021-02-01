namespace OovWebApi.ApiModel

open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.Mvc

// https://stackoverflow.com/questions/5523051/record-with-parameterless-constructor
type OoxmlPayload() =
    let mutable _name = ""
    let mutable _payload: IFormFile = null

    [<FromForm(Name = "name")>]
    member _.Name
        with get () = _name
        and set (v) = _name <- v

    [<FromForm(Name = "payload")>]
    member _.Payload
        with get () = _payload
        and set (v) = _payload <- v

type HistoryRecord = { Hash: string; FileName: string }
