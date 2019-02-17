package com.mplescano.poc.citizen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * @author s6026865
 * @see https://github.com/eugenp/tutorials/blob/master/spring-cloud/spring-cloud-bootstrap/discovery/src/main/java/com/baeldung/spring/cloud/bootstrap/discovery/SecurityConfig.java
 */
@SpringBootApplication
@EnableEurekaServer
public class CitizenDiscovererApplication {

    public static void main(String[] args) {
        SpringApplication.run(CitizenDiscovererApplication.class, args);
    }
}
