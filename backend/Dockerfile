FROM openjdk:17
COPY ./build/libs/*.jar app.jar
ENTRYPOINT ["java","-DSpring.profiles.active=prod","-jar","/app.jar"]