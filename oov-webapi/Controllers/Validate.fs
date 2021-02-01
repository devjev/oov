namespace OovWebApi.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open OovWebApi.ApiModel
open OovWebApi.Store
open OovCore
open Newtonsoft.Json

[<ApiController>]
[<Route("api/validate")>]
type ValidateController(logger: ILogger<ValidateController>) =
    inherit ControllerBase()

    [<HttpPost>]
    member _.Post([<FromForm>] payload: OoxmlPayload) =
        use storeResults = new DataStore(Some("__results"))
        use storeFileNames = new DataStore(Some("__names"))

        let stream = payload.Payload.OpenReadStream()
        let name = payload.Name

        let hash = Utils.Hash.streamAsString stream

        match storeResults.Read hash with
        | None ->
            let validation =
                StreamOoxmlValidation(name, stream) :> IValidation

            let result = validation.Validate()
            let serialized = JsonConvert.SerializeObject(result)
            storeResults.Write(hash, serialized)
            storeFileNames.Write(hash, name)
            result

        | Some (payload) ->
            let payloadAsString =
                System.Text.Encoding.UTF8.GetString payload

            let deserialized =
                JsonConvert.DeserializeObject<ValidationResult>(payloadAsString)

            deserialized
