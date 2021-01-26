namespace OovWebApi.Controllers

open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open OovWebApi
open OovWebApi.ApiModel
open OovCore
open System.IO
open Microsoft.AspNetCore.Http

[<ApiController>]
[<Route("api/validate")>]
type ValidateController(logger: ILogger<ValidateController>) =
    inherit ControllerBase()

    [<HttpPost>]
    member _.Post([<FromForm>] payload: OoxmlPayload) =
        let stream = payload.Payload.OpenReadStream()
        let name = payload.Name

        let validation =
            StreamOoxmlValidation(name, stream) :> IValidation

        validation.Validate()
