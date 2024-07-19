# Utiliser l'image de base officielle de .NET 8 SDK pour la compilation
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de projet et restaurer les dépendances
COPY *.csproj ./
RUN dotnet restore

# Copier le reste des fichiers de l'application et construire l'application
COPY . ./
RUN dotnet publish -c Release -o out

# Utiliser une image de base de runtime .NET 8 pour exécuter l'application
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de l'étape de build vers l'étape de runtime
COPY --from=build /app/out .

# Exposer le port que l'application utilise
EXPOSE 5039

# Démarrer l'application .NET
ENTRYPOINT ["dotnet", "backend.dll"]
