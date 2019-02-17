package com.mplescano.poc.citizen.config;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSourceConfig {
    
    @Bean("dataSource")
    public DataSource dataSource(DataSourceProperties dataSourceSecurityProperties) {
        return dataSourceSecurityProperties.initializeDataSourceBuilder().build();
    }
}