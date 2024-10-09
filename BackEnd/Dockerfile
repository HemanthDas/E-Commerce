# Use Maven to build the application
FROM maven:3.9.9-eclipse-temurin-22 AS build

WORKDIR /app

# Copy the pom.xml and the source code
COPY pom.xml ./
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight JRE for running the application
FROM eclipse-temurin:22-jre

WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
