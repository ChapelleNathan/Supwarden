# Utiliser l'image de base OpenJDK 17 (ou autre version si nécessaire)
FROM openjdk:22-jdk-alpine

# Créer un répertoire pour l'application
VOLUME /tmp

# Définir l'emplacement du fichier JAR de l'application
ARG JAR_FILE=target/myapp.jar

# Copier le fichier JAR dans l'image Docker
COPY ${JAR_FILE} app.jar

# Exposer le port que l'application utilise
EXPOSE 8080

# Définir la commande pour exécuter l'application
ENTRYPOINT ["java","-jar","/app.jar"]
