namespace OovWebApi.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open OovWebApi.ApiModel
open OovWebApi.Store
open OovCore
open Newtonsoft.Json

[<ApiController>]
[<Route("api/history")>]
type HistoryController(logger: ILogger<HistoryController>) =
    inherit ControllerBase()

    [<HttpGet>]
    member _.Get() =
        use storeFileNames = new DataStore(Some("__names"))
        storeFileNames.Keys
