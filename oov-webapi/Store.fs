namespace OovWebApi.Store

open RocksDbSharp
open System

type DataStore(path: Option<string>) =

    let dbPath =
        match path with
        | Some (p) -> p
        | None -> "./__defaultdb"

    let options =
        DbOptions()
            .SetCreateIfMissing(true)
            .SetCreateMissingColumnFamilies(true)

    let db = RocksDb.Open(options, dbPath)

    member _.Write(key: string, value) = db.Put(key, value)

    member _.Read(key: string) =
        let byteKey = System.Text.Encoding.UTF8.GetBytes key
        let payload = db.Get(byteKey)

        if Object.ReferenceEquals(payload, null) then
            None
        else
            Some(payload)

    member _.Keys =
        let rec keys(itr: Iterator) =
            try
                let skey = itr.ToString()
                let next = itr.Next()
                [ skey ] @ (next |> keys)
            with _ -> []

        db.NewIterator() |> keys

    interface IDisposable with
        member _.Dispose() = db.Dispose()
