namespace OovWebApi.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open OovWebApi.ApiModel
open OovWebApi.Store
open OovCore
open Newtonsoft.Json
open Microsoft.Extensions.Configuration

[<ApiController>]
[<Route("api/validate")>]
type ValidateController(config: IConfiguration, logger: ILogger<ValidateController>) =
    inherit ControllerBase()

    [<HttpPost>]
    member _.Post([<FromForm>] payload: OoxmlPayload) =
        let resultsDataPath = config.["Paths:Data:ValidationResults"]
        let nameLookupDataPath = config.["Paths:Data:NameLookup"]

        use storeResults = new DataStore(resultsDataPath)
        use storeFileNames = new DataStore(nameLookupDataPath)

        // Read in the entire stream into memory and only then calculate the
        // hash Otherwise you'd calculate your hash over a random array of bytes
        // as it is being loaded
        let streamSource = payload.Payload.OpenReadStream()
        use stream = new System.IO.MemoryStream()
        streamSource.CopyTo stream
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
