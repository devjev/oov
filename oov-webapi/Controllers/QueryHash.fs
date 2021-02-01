namespace OovWebApi.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open OovWebApi.ApiModel
open OovWebApi.Store
open OovCore
open Newtonsoft.Json

[<ApiController>]
[<Route("api/query")>]
type QueryHashController(logger: ILogger<QueryHashController>) =
    inherit ControllerBase()

    [<HttpGet>]
    member _.Get(hash: string) =
        use storeResults = new DataStore(Some("__results"))

        match hash |> storeResults.Read with
        | Some (payload) ->
            let json =
                payload |> System.Text.Encoding.UTF8.GetString

            let obj =
                JsonConvert.DeserializeObject<ValidationResult>(json)

            Some(obj)
        | None -> None
