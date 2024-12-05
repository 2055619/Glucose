# Build stage
FROM maven:3.9.9 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy Maven configuration and source files
COPY pom.xml ./
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:21

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file from the build stage
COPY --from=build /app/target/glucose-0.0.1-SNAPSHOT.jar glucose.jar

# Expose the port your app runs on
EXPOSE 8087

# Command to run the JAR file
CMD ["java", "-jar", "glucose.jar"]
