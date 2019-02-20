#!/bin/bash

unzip /assets/citizen-webapp.zip -d /usr/local/apache2/htdocs/

rm -rf /assets/

exit $?
