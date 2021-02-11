# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /source

COPY *.sln .
COPY oov-webapi/. ./oov-webapi/
COPY oov-spa/. ./oov-spa
COPY oov-core/. ./oov-core
WORKDIR /source
RUN dotnet restore
RUN dotnet build -c release --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /source/oov-webapi/bin/Release/net5.0 ./
ENTRYPOINT ["dotnet", "oov-webapi.dll"]