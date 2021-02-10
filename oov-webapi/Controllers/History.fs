namespace OovWebApi.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open OovWebApi.ApiModel
open OovWebApi.Store
open OovCore
open Newtonsoft.Json
open Microsoft.Extensions.Configuration

[<ApiController>]
[<Route("api/history")>]
type HistoryController(config: IConfiguration, logger: ILogger<HistoryController>) =
    inherit ControllerBase()

    [<HttpGet>]
    member _.Get() =
        let nameDataPath =
            config.["Paths:Data:NameLookup"]
            |> System.IO.Path.GetFullPath

        use storeFileNames = new DataStore(nameDataPath)

        seq {
            for (key, value) in storeFileNames.Pairs ->
                { Hash = key
                  FileName = System.Text.Encoding.UTF8.GetString(value) }
        }
        |> List.ofSeq
