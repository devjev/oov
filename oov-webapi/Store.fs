namespace OovWebApi.Store

open RocksDbSharp
open System
open System.IO

type DataStore(path: string) =
    let options =
        DbOptions()
            .SetCreateIfMissing(true)
            .SetCreateMissingColumnFamilies(true)

    // TODO double check if parent directory exists, and if not, create it
    let ensureDir path_ =
        let pathIsDir =
            if File.Exists(path_) then
                let attrs = File.GetAttributes(path_)
                (attrs &&& FileAttributes.Directory) = FileAttributes.Directory
            else
                true

        let dir =
            if pathIsDir then
                path_
            else
                Directory.GetParent(path_).FullName

        if not <| Directory.Exists(dir) then
            Directory.CreateDirectory(dir) |> ignore

    let db =
        path |> ensureDir
        RocksDb.Open(options, path)

    member _.Write(key: string, value) = db.Put(key, value)

    member _.Read(key: string) =
        let byteKey = System.Text.Encoding.UTF8.GetBytes(key)
        let payload = db.Get(byteKey)

        if Object.ReferenceEquals(payload, null) then
            None
        else
            Some(payload)

    member _.Keys =
        let rec keys (itr: Iterator) =
            if itr.Valid() then
                let skey = itr.StringKey()
                [ skey ] @ (itr.Next() |> keys)
            else
                []

        db.NewIterator().SeekToFirst() |> keys

    member _.Pairs =
        let rec pairs (itr: Iterator) =
            if itr.Valid() then
                let key = itr.StringKey()
                let value = itr.Value()
                [ (key, value) ] @ (itr.Next() |> pairs)
            else
                []

        db.NewIterator().SeekToFirst() |> pairs

    interface IDisposable with
        member _.Dispose() = db.Dispose()
