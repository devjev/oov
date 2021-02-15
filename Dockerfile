# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /source

# Get Node dependencies
RUN apt-get update
RUN apt-get install npm -y
RUN npm install --global yarn

# Pull in
COPY *.sln .
COPY oov-webapi/. ./oov-webapi/
COPY oov-spa/. ./oov-spa
COPY oov-core/. ./oov-core
WORKDIR /source
RUN dotnet restore
RUN dotnet publish -c release --no-restore

WORKDIR /source/oov-spa
RUN yarn install
RUN yarn build

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:5.0

# Pull in library dependencies for RocksDB
RUN apt-get update
RUN apt-get install libc6-dev=2.28-10 -y
RUN apt-get install libsnappy-dev=1.1.7-1 -y

# Prepare the app
WORKDIR /app
COPY --from=build /source/oov-webapi/bin/Release/net5.0/publish ./
COPY --from=build /source/oov-spa/dist ./wwwroot
COPY --from=build /source/oov-spa/package.json ./wwwroot/package.json

# Launch
ENTRYPOINT ["dotnet", "oov-webapi.dll"]