package com.mplescano.poc.citizen.config;

import javax.persistence.EntityManagerFactory;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = {
		"com.mplescano.poc.citizen.repository.main" }, 
	transactionManagerRef = "mainTransactionManager")
public class JpaRegularConfig {

	@Bean("mainTransactionManager")
	@Primary
	public PlatformTransactionManager mainTransactionManager(
			EntityManagerFactory regularEntityManagerFactory) {
		return new JpaTransactionManager(regularEntityManagerFactory);
	}
}
