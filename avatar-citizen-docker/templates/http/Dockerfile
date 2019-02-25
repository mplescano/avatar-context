FROM httpd:2.4
VOLUME /tmp
ARG ARTIFACT_NAME
ARG EXPOSED_PORT
ARG TYPE_APP
COPY ./${ARTIFACT_NAME}/ /usr/local/apache2/htdocs/
RUN chmod 755 /usr/local/apache2/htdocs/assets
RUN chmod 755 /usr/local/apache2/htdocs/assets/images
EXPOSE ${EXPOSED_PORT}
