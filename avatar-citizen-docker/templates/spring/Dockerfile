FROM openjdk:8-jre-stretch
VOLUME /tmp
# Copy assets
ADD assets /assets
ARG ARTIFACT_NAME
ARG EXPOSED_PORT
ARG TYPE_APP
ADD ${ARTIFACT_NAME}.jar /assets/citizen-app.jar
RUN chmod +x /assets/${TYPE_APP}/setup.debian.sh
RUN /assets/${TYPE_APP}/setup.debian.sh
EXPOSE ${EXPOSED_PORT}
ENTRYPOINT ["/opt/spring-boot/start-spring-boot.sh"]