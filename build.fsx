#r "paket:
nuget Fake.Core.Target
nuget Fake.IO.FileSystem
nuget Fake.DotNet.MSBuild //"
#load "./.fake/build.fsx/intellisense.fsx"

open Fake.Core
open Fake.DotNet
open Fake.IO
open Fake.IO.Globbing.Operators
open Fake.Core.TargetOperators

Target.create "Clean" (fun _ -> Trace.log " ---- Cleaning up ---- ")

Target.create
    "Build"
    (fun _ ->
        !! "**/*.fsproj"
        |> MSBuild.runRelease id "./build/" "Build"
        |> ignore)

"Clean" ==> "Build"

Target.runOrDefault "Build"
