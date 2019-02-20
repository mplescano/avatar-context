FROM openjdk:8-jre-stretch
VOLUME /tmp
# Copy assets
ARG ARTIFACT_NAME
ARG EXPOSED_PORT
ARG TYPE_APP
ADD ${ARTIFACT_NAME}.zip /assets/citizen-webapp.zip
RUN chmod +x /assets/${TYPE_APP}/setup.debian.sh
RUN /assets/${TYPE_APP}/setup.debian.sh
EXPOSE ${EXPOSED_PORT}
ENTRYPOINT ["/opt/spring-boot/start-spring-boot.sh"]