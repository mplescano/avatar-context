#!/bin/bash

#activate executable option in spring-boot-maven plugin
su - spring-boot -c "exec authbind --deep /opt/spring-boot/citizen-app.jar"