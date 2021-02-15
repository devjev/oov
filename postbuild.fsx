open System
open System.IO
open System.Runtime.InteropServices

type OsType =
    | Windows
    | Unix


let os =
    if RuntimeInformation.IsOSPlatform(OSPlatform.Windows) then
        Windows
    else
        Unix

let exec command =
    let mutable output: string list = []
    let mutable errors: string list = []

    let (cmdFile, cmdArgs) =
        match os with
        | Windows -> ("cmd.exe", $"/C {command}")
        | Unix -> ("bash", command)

    use p = new Diagnostics.Process()
    p.StartInfo.FileName <- cmdFile
    p.StartInfo.Arguments <- cmdArgs
    p.StartInfo.RedirectStandardOutput <- true
    p.StartInfo.RedirectStandardError <- true
    p.StartInfo.WindowStyle <- Diagnostics.ProcessWindowStyle.Hidden
    p.Start() |> ignore

    while (not p.StandardOutput.EndOfStream) do
        let line = p.StandardOutput.ReadLine()
        output <- List.append output [ line ]

    while (not p.StandardError.EndOfStream) do
        let error = p.StandardError.ReadLine()
        errors <- List.append errors [ error ]

    (output, errors)


let cd path = Directory.SetCurrentDirectory(path)


let mkdir path =
    if Directory.Exists(path) then
        Directory.Delete(path, true)

    Directory.CreateDirectory(path)


let rec copy fromPath toPath =
    let source = DirectoryInfo(fromPath)

    if not source.Exists then
        failwithf "Source directory not found: %s" fromPath

    toPath |> mkdir |> ignore

    let files = source.GetFiles()

    for file in files do
        let targetPath = Path.Combine(toPath, file.Name)
        file.CopyTo(targetPath, false) |> ignore

    let subDirs = source.GetDirectories()

    for subDirSource in subDirs do
        let targetDir = Path.Combine(toPath, subDirSource.Name)
        copy subDirSource.FullName targetDir

let args =
    match fsi.CommandLineArgs |> List.ofArray with
    | _ :: webApiOut :: spaProject :: _ -> Some((webApiOut, spaProject))
    | _ -> None

match args with
| Some ((webApiOut, spaProject)) ->
    let target = Path.Combine(webApiOut, "wwwroot")
    target |> mkdir |> ignore
    let source = Path.Combine(spaProject, "dist")

    cd spaProject
    "yarn install" |> exec |> ignore
    "yarn build" |> exec |> ignore

    copy source target

| None -> failwith "Need two CLI arguments: web api output dir, spa project dir"
