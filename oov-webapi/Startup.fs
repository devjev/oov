namespace OovWebApi

open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.HttpsPolicy
open Microsoft.AspNetCore.HttpOverrides
open Microsoft.AspNetCore.Mvc
open Microsoft.AspNetCore.Cors
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.FileProviders

type Startup(configuration: IConfiguration) =
    member _.Configuration = configuration

    // This method gets called by the runtime. Use this method to add services to the container.
    member _.ConfigureServices(services: IServiceCollection) =
        services.AddControllers() |> ignore
        services.AddSwaggerGen() |> ignore

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    member _.Configure(app: IApplicationBuilder, env: IWebHostEnvironment) =
        if (env.IsDevelopment()) then
            app.UseDeveloperExceptionPage() |> ignore

        let corsBuilder =
            new Action<_>(fun (builder: Infrastructure.CorsPolicyBuilder) ->
                builder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin()
                |> ignore)

        let staticFileOptions = StaticFileOptions()

        staticFileOptions.FileProvider <-
            new PhysicalFileProvider(System.IO.Path.Combine(env.ContentRootPath, "wwwroot"))

        app
            .UseRouting()
            .UseCors(corsBuilder)
            .UseDefaultFiles()
            .UseStaticFiles(staticFileOptions)
            .UseSwagger()
            .UseEndpoints(fun endpoints -> endpoints.MapControllers() |> ignore)
        |> ignore
