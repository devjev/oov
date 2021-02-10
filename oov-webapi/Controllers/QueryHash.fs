namespace OovWebApi.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open OovWebApi.ApiModel
open OovWebApi.Store
open OovCore
open Newtonsoft.Json
open Microsoft.Extensions.Configuration

[<ApiController>]
[<Route("api/query")>]
type QueryHashController(config: IConfiguration, logger: ILogger<QueryHashController>) =
    inherit ControllerBase()

    [<HttpGet>]
    member _.Get(hash: string) =
        let path = config.["Paths:Data:ValidationResults"]
        use storeResults = new DataStore(path)

        match hash |> storeResults.Read with
        | Some (payload) ->
            let json =
                payload |> System.Text.Encoding.UTF8.GetString

            let obj =
                JsonConvert.DeserializeObject<ValidationResult>(json)

            Some(obj)
        | None -> None
