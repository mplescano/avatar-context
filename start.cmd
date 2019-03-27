
set SPRING_PROFILES_ACTIVE=local

Rem mvn -B -Ddocker-build=true clean install

mvn -B -Dspring-build=true clean install && ^
start "discoverer-server" java -jar avatar-citizen-server-discoverer/target/avatar-citizen-server-discoverer-1.2.0-war.jar && ^
start "logging-server" java -jar avatar-citizen-server-logging/target/avatar-citizen-server-logging-1.2.0-war.jar && ^
start "database" java -jar avatar-citizen-server-database/target/avatar-citizen-server-database-1.2.0-war.jar && ^
start "api-core-service" java -jar avatar-citizen-server-api-core/target/avatar-citizen-server-api-core-1.2.0-war.jar && ^
start "gateway" java -jar avatar-citizen-server-gateway/target/avatar-citizen-server-gateway-1.2.0-war.jar

