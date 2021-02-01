# oov - Office Open XML Validation Service

TODO:

- oov WebAPI
    * ~~Have a RocksDB backend~~
    * ~~Have an endpoint for list of all queried/validated documents~~
    * ~~Have an endpoint to search validated documents by hash~~
    * ~~Have an endpoint to search validated documents by name~~
        * This requires me actually reading the docs and thinking about the
          problem and that's just expecting too much
    * Use column families and batch writes in ValidateController

- oov WebUI
    * Have an SPA that allows graphical interaction with the API