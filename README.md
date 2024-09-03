# Installation de Supwarden

## I - Téléchargement du projet

```bash
git clone git@github.com:ChapelleNathan/Supwarden.git
```
et 
```bash
cd Supwarden/
```

## II - Configuration de l'application

### 1 - Variables d'environnement de la base de données

Avant de lancer l'application, il faut créer quelques fichiers de configuration pour le backend et le frontend.
Tout d'abord, vous pouvez copier le fichier `.env.exemple` à la racine du projet et le renommer en `.env` :
```bash
cp .env.exemple .env
```

Remplissez les différents champs qui seront vos identifiants pour vous connecter à la base de données PostgreSQL.

### 2 - Variables d'environnement du Backend

Copiez le fichier `appsettings.json.exemple` et renommez-le `appsettings.json`.

À l'intérieur, vous trouverez deux champs essentiels au fonctionnement de l'application.

- **"DevConnection"** est la chaîne de connexion qui permet à l'application .NET de se connecter depuis votre PC à la base de données qui se trouvera sur une image Docker. Elle se présente sous cette forme : `Host=localhost;Port=5432;Username=username;Password=password;Database=dbName`.
  Remplacez `username` par la valeur du nom d'utilisateur que vous avez définie dans le fichier `.env` pour la base de données, ainsi que `password` et `dbName`.

- **"Token"** est le jeton qui permettra de générer le Bearer token utilisé pour l'authentification de l'application.
  Vous pouvez mettre la valeur que vous souhaitez, mais voici celle que j'ai utilisée pendant le développement de l'application :
  ```
  MIICWwIBAAKBgHZO8IQouqjDyY47ZDGdw9jPDVHadgfT1kP3igz5xamdVaYPHaN24UZMeSXjW9sWZzwFVbhOAGrjR0MM6APrlvv5mpy67S/K4q4D7Dvf6QySKFzwMZ99Qk10fK8tLoUlHG3qfk9+85LhL/Rnmd9FD7nz8+cYXFmz5LIaLEQATdyNAgMBAAECgYA9ng2Md34IKbiPGIWthcKb5/LC/+nbV8xPp9xBt9Dn7ybNjy/blC3uJCQwxIJxz/BChXDIxe9XvDnARTeN2yTOKrV6mUfI+VmON5gTD5hMGtWmxEsmTfu3JL0LjDe8Rfdu46w5qjX5jyDwU0ygJPqXJPRmHOQW0WN8oLIaDBxIQQJBAN66qMS2GtcgTqECjnZuuP+qrTKL4JzG+yLLNoyWJbMlF0/HatsmrFq/CkYwA806OTmCkUSm9x6mpX1wHKi4jbECQQCH+yVb67gdghmoNhc5vLgnm/efNnhUh7u07OCL3tE9EBbxZFRs17HftfEcfmtOtoyTBpf9jrOvaGjYxmxXWSedAkByZrHVCCxVHxUEAoomLsz7FTGM6ufd3x6TSomkQGLw1zZYFfe+xOh2W/XtAzCQsz09WuE+v/viVHpgKbuutcyhAkB8o8hXnBVz/rdTxti9FG1b6QstBXmASbXVHbaonkD+DoxpEMSNy5t/6b4qlvn2+T6a2VVhlXbAFhzcbewKmG7FAkEAs8z4Y1uI0Bf6ge4foXZ/2B9/pJpODnp2cbQjHomnXM861B/C+jPW3TJJN2cfbAxhCQT2NhzewaqoYzy7dpYsIQ==
  ```
  Ce jeton devrait normalement être stocké dans un endroit sécurisé, comme un serveur spécialisé (secret manager).

### 3 - Variables d'environnement du Frontend

Copiez le fichier `.env.exemple` et renommez-le `.env`.
À l'intérieur, vous trouverez la clé API qui permettra de gérer la connexion OAuth2 de l'application.
Dans cette application, j'utilise celle de Google. Voici la clé que j'ai utilisée pour le développement, mais vous pouvez utiliser une clé que vous avez générée vous-même :
```
343938300973-f7ici84rh7202f46qei21431nvg87hqm.apps.googleusercontent.com
```

## III - Lancement du projet

### 1 - Lancement de l'application .NET

D'abord, n'oubliez pas de lancer la base de données.
J'utilise une base de données PostgreSQL dans une image Docker. Pour lancer seulement le serveur PostgreSQL :
```bash
docker compose up -d postgres
```
> L'option `-d` permet de détacher le processus, mais si vous souhaitez voir les logs du serveur dans votre console, vous pouvez l'enlever.

Pour lancer l'application .NET, il faut d'abord effectuer les migrations.
Pour cela, j'ai utilisé EntityFramework :
```bash
dotnet ef database update
```

Ensuite, vous pouvez lancer l'application :
```bash
dotnet run
```

Le backend est lancé !

### 2 - Lancement de l'application React

Pour le frontend, il faudra installer les dépendances :
```bash
npm install
```

Ensuite, lancez l'application :
```bash
npm run dev
```

Voilà, l'application Supwarden est maintenant prête à être utilisée !

## IV - Lancer l'application avec Docker

```bash
docker compose up -d
```
