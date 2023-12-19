FROM openjdk:20-jdk
COPY target/api_gateway.jar api_gateway.jar
COPY src/main/resources/application.properties application.properties
ENV JAVA_OPTS=""
CMD java \
      -Dspring.config.location=/application.properties \
      -Djava.security.egd=file:/dev/./urandom \
      $JAVA_OPTS \
      -jar /api_gateway.jar
