# Installation de Supwarden

## I - Téléchargement du projet

```bash
git@github.com:ChapelleNathan/Supwarden.git
```
 et 
 ```bash
cd Supwarden/
```

## II - Configuration de l'application

### 1 - Variables d'environnement de la db

Avant de lancer l'application il faut créer quelques fichiers de configuration pour le back et le front.
Tout d'abord vous pouvez copier coller le fichier .env.exemple à la racine du projet et nommez le .env
```bash
cp .env.exemple .env
```

Remplissez les différent champs qui seront vos logs pour vous connecter à la base de donnée Postgre

### 2 - Variables d'environnement du Backend

Copiez collez le fichier appsettings.json.exemple et renommez le appsettings.json.

Dedans vous y retrouverez deux champs essentiels pour le fonctionnement de l'application.

- "DevConnection" est la connection string qui permet à l'application dotnet de se connecter depuis votre pc à 
la db qui se situera sur une image docker. Elle se présente sous cette forme : Host=localhost;Port=5432;Username=username;Password=password;Database=dbName
Echangez bien Username avec la valeur username que vous avez mis dans le .env pour la db. Pareil pour password et dbName.

- "Token" est le token qui permettra de générer le Bearer token qui gère l'authenfication de l'application.
Vous pouvez mettre la valeur que vous voulez mais je vous partage celle que j'ai utilisé pendant le développement
de l'application:
```
MIICWwIBAAKBgHZO8IQouqjDyY47ZDGdw9jPDVHadgfT1kP3igz5xamdVaYPHaN24UZMeSXjW9sWZzwFVbhOAGrjR0MM6APrlvv5mpy67S/K4q4D7Dvf6QySKFzwMZ99Qk10fK8tLoUlHG3qfk9+85LhL/Rnmd9FD7nz8+cYXFmz5LIaLEQATdyNAgMBAAECgYA9ng2Md34IKbiPGIWthcKb5/LC/+nbV8xPp9xBt9Dn7ybNjy/blC3uJCQwxIJxz/BChXDIxe9XvDnARTeN2yTOKrV6mUfI+VmON5gTD5hMGtWmxEsmTfu3JL0LjDe8Rfdu46w5qjX5jyDwU0ygJPqXJPRmHOQW0WN8oLIaDBxIQQJBAN66qMS2GtcgTqECjnZuuP+qrTKL4JzG+yLLNoyWJbMlF0/HatsmrFq/CkYwA806OTmCkUSm9x6mpX1wHKi4jbECQQCH+yVb67gdghmoNhc5vLgnm/efNnhUh7u07OCL3tE9EBbxZFRs17HftfEcfmtOtoyTBpf9jrOvaGjYxmxXWSedAkByZrHVCCxVHxUEAoomLsz7FTGM6ufd3x6TSomkQGLw1zZYFfe+xOh2W/XtAzCQsz09WuE+v/viVHpgKbuutcyhAkB8o8hXnBVz/rdTxti9FG1b6QstBXmASbXVHbaonkD+DoxpEMSNy5t/6b4qlvn2+T6a2VVhlXbAFhzcbewKmG7FAkEAs8z4Y1uI0Bf6ge4foXZ/2B9/pJpODnp2cbQjHomnXM861B/C+jPW3TJJN2cfbAxhCQT2NhzewaqoYzy7dpYsIQ==
```
Ce token est normalement stocker dans un endroit sécuriser comme un serveur spécialisé (secret manager).


### 3 - Variables d'environnement du Frontend

Copiez collez le fichier .env.exemple et renommez le .env.
Dedans vous y trouverez la clé API qui permettra de gérer la connection OAUTH2 de l'application.
Dans cette application j'utilise celle de google. Je vous mets la clé que j'ai utilisé pour le développement de l'application mais vous pouvez utiliser une clé que vous avez généré vous même !
```
343938300973-f7ici84rh7202f46qei21431nvg87hqm.apps.googleusercontent.com
```

## III - Lancement du projet

### 1 - Lancement de l'application dotnet

D'abord n'oubliez pas de lancer la base de donnée.
J'utilise une base de donnée Postgresql dans une image docker. Pour lancer seul le server Postgres:
```bash
docker compose up -d postgres
```
> -d pour detach mais si vous voulez les logs du serveur dans votre console vous pouvez l'enlever

Pour lancer l'application dotnet il faut faire les migrations de l'application.
Pour ceci j'ai utiliser EntityFramework.
```bash
dotnet ef database update
```

Ensuite vous pouvez lancer l'application
```bash
dotnet run
```

Le backend est lancé !

### 2 - Lancement de l'application react

Pour le front il faudra installer les dépendance.
```bash
npm i
```

et ensuite lancer l'application

```bash
npm run dev
```

Voila l'application Supwarden est maintenant prête a être utilisé !

## IV - Lancer l'application avec Docker

```bash
docker compose up -d
```
