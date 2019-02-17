package com.mplescano.poc.citizen.config;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = {
		"com.mplescano.poc.citizen.repository.main" }, 
	entityManagerFactoryRef = "mainEntityManager", 
	transactionManagerRef = "mainTransactionManager")
public class JpaRegularConfig {

	@Bean("mainEntityManager")
	@Primary
	public LocalContainerEntityManagerFactoryBean regularEntityManager(
			EntityManagerFactoryBuilder builder,
			@Qualifier("dataSource") DataSource dataSource) {
		return builder.dataSource(dataSource)
				.packages("com.mplescano.poc.citizen.model.entity.main")
				.persistenceUnit("main").build();
	}

	@Bean("mainTransactionManager")
	@Primary
	public PlatformTransactionManager regularTransactionManager(
			@Qualifier("mainEntityManager") EntityManagerFactory regularEntityManagerFactory) {
		return new JpaTransactionManager(regularEntityManagerFactory);
	}
}
