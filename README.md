# oov - Office Open XML Validation Service

TODO:

- oov WebAPI
    * ~~Have a RocksDB backend~~
    * ~~Have an endpoint for list of all queried/validated documents~~
    * ~~Have an endpoint to search validated documents by hash~~
    * ~~Have an endpoint to search validated documents by name~~
        * This requires me actually to read the docs and think about the
          problem and that's just expecting too much
    * Use column families and batch writes in ValidateController
    * Maybe have a statistics data store to track outliers in error
      distributions
    * Update history via push. See [this](http://www.binaryintellect.net/articles/a77ac135-c756-4ee0-9e99-0a904959de94.aspx)

- oov WebUI
    * Have an SPA that allows graphical interaction with the API
        * ~~Started~~
        * ~~Need to implement a redux store to make it not go all fucky with time~~
        * ~~Use redux sagas to handle asynchronous calls~~
        * Use local storage for local client caching of results to reduce UI
          latency. Caching should be alright, since primary identity is driven
          by file digest hashes.
        * Add d3-based visualisations frequency distribution

- Deployment
  * Read [this](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-5.0)

# Docker

## Build Image

`> docker build -t oov-app .`

## Run Image

`> docker run -p 80:80 oov-app`

## CLI into your image

`> docker run -it --entrypoint /bin/bash oov-app -s`