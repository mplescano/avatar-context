package com.mplescano.poc.citizen.config;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.core.io.Resource;

import com.mplescano.poc.citizen.component.cors.HighestPrecedenceCorsFilter;
import com.mplescano.poc.citizen.component.cors.PropCorsConfigurationSource;
import com.mplescano.poc.citizen.component.prop.ResourcePropertySource;

@Configuration
public class BeanServicesConfig {

	@Bean
    public MessageSourceAccessor buildMessageSourceAccessor(MessageSource messageSource) {
        Locale currentLocale =  LocaleContextHolder.getLocale();
        return new MessageSourceAccessor(messageSource, currentLocale);
    }

    @Bean
    public HighestPrecedenceCorsFilter corsFilter(@Value("${citizen.cors.config.resources}") Resource corsConfigResource, 
    		@Value("${citizen.resources.cache.expirationTimeInSeconds}") long expirationTimeInSeconds) {
    	return new HighestPrecedenceCorsFilter(new PropCorsConfigurationSource("cors", new ResourcePropertySource(corsConfigResource), expirationTimeInSeconds));
    }

    /*@Bean
    public ErrorProperties errorProperties() {
    	return new ErrorProperties();
    }*/
   
}
