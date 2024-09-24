# Use an official Maven image as a parent image
FROM maven:3.8.7-eclipse-temurin-17 AS build

# Set the working directory
WORKDIR /app

# Copy .env file
COPY .env ./

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the project files
COPY src ./src

# Build the application
RUN mvn package -DskipTests

# Use an official OpenJDK image as a parent image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build image
COPY --from=build /app/target/*.jar ./app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
