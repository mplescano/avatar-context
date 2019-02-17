#!/bin/bash

useradd -md /opt/spring-boot spring-boot &&
printf 'spring-boot\nspring-boot\n'|passwd spring-boot &&
mv /assets/wait-for-it.sh /opt/spring-boot/ &&
mv /assets/db/start-spring-boot.sh /opt/spring-boot/ &&
mv /assets/citizen-app.jar /opt/spring-boot/ &&
chown -R spring-boot:spring-boot /opt/spring-boot/ &&
su - spring-boot -c "chmod +x /opt/spring-boot/wait-for-it.sh" &&
su - spring-boot -c "chmod +x /opt/spring-boot/start-spring-boot.sh" &&
su - spring-boot -c "touch /opt/spring-boot/citizen-app.jar" &&
su - spring-boot -c "chmod 500 /opt/spring-boot/citizen-app.jar" &&
touch /etc/profile.d/spring.boot.sh &&
echo "export SPRING_PROFILES_ACTIVE=docker" >> /etc/profile.d/spring.boot.sh &&
touch /etc/profile.d/java.opts.sh &&
echo "export JAVA_OPTS='-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -Djava.security.egd=file:/dev/./urandom'" >> /etc/profile.d/java.opts.sh &&
rm -rf /assets/

exit $?
