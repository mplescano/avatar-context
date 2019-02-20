FROM httpd:2.4
VOLUME /tmp
# Copy assets
ADD assets /assets
ARG ARTIFACT_NAME
ARG EXPOSED_PORT
ARG TYPE_APP
ADD ${ARTIFACT_NAME}.zip /assets/citizen-webapp.zip
RUN chmod +x /assets/${TYPE_APP}/setup.debian.sh
RUN /assets/${TYPE_APP}/setup.debian.sh
EXPOSE ${EXPOSED_PORT}
