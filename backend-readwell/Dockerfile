# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy the source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the runtime image
FROM openjdk:17-slim
LABEL authors="sinke"

# Set the working directory
WORKDIR /app

# Copy the wait-for-it script
COPY ./scripts/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Copy the built JAR file from the build stage
COPY --from=build /app/target/backend-readwell-0.0.1-SNAPSHOT.jar ./target/

# Add runtime environment variable defaults (optional)
ENV SPRING_SECURITY_JWT_SECRET_KEY="defaultSecretKey"
ENV SPRING_SECURITY_JWT_EXPIRATION=3600000
ENV POSTGRES_HOST=postgres
ENV POSTGRES_PORT=5432
ENV POSTGRES_DB=readwell-db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV SPRING_MAIL_HOST=readwell-mail-dev
ENV SPRING_MAIL_PORT=1025
ENV SPRING_MAIL_USERNAME=clara
ENV SPRING_MAIL_PASSWORD=clara
ENV ALLOWED_ORIGINS="http://localhost:3000,http://readwell-UI:3000,http://10.157.166.1:3000"

# Expose the port that your application runs on
EXPOSE 8080

# Command to run the application, using wait-for-it to ensure postgres is ready
CMD ["wait-for-it", "postgres:5432", "--", "java", "-jar", "target/backend-readwell-0.0.1-SNAPSHOT.jar"]
