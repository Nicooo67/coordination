# --- Stage build : compile le jar avec le wrapper Maven (JDK 23) ---
FROM eclipse-temurin:23-jdk AS build
WORKDIR /app

# Dépendances d'abord (cache Docker)
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN ./mvnw -B dependency:go-offline

# Code source puis packaging (tests ignorés : déjà couverts par la CI)
COPY src/ src/
RUN ./mvnw -B -DskipTests package

# --- Stage runtime : image légère avec juste le JRE + le jar ---
FROM eclipse-temurin:23-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
