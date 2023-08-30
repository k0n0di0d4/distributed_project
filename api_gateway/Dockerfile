FROM openjdk:20-jdk
VOLUME /tmp
COPY target/api_gateway.jar api_gateway.jar
ENTRYPOINT ["java","-jar","/api_gateway.jar"]