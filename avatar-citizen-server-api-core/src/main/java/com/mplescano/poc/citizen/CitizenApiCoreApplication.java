package com.mplescano.poc.citizen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
//import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
/*@EnableFeignClients*/
public class CitizenApiCoreApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(CitizenApiCoreApplication.class, args);
    }
}
