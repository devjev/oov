namespace oov_webapi.Controllers

open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open oov_webapi

[<ApiController>]
[<Route("[controller]")>]
type ValidateController(logger: ILogger<ValidateController>) =
    inherit ControllerBase()

    [<HttpGet>]
    member _.Get() =
        let rng = System.Random()

        [| for index in 0 .. 4 ->
            { Date = DateTime.Now.AddDays(float index)
              TemperatureC = rng.Next(-20, 55)
              Summary = summaries.[rng.Next(summaries.Length)] } |]
