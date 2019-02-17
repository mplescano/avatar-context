package com.mplescano.poc.citizen.component.cors;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.context.properties.bind.Bindable;
import org.springframework.boot.context.properties.bind.Binder;
import org.springframework.boot.context.properties.source.ConfigurationPropertySources;
import org.springframework.core.env.PropertySource;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.util.UrlPathHelper;

import com.mplescano.poc.citizen.component.cors.CorsConfigurationProperties.ItemCorsConfigProp;

/**
 * @author mplescano
 * @see https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-Configuration-Binding
 * @see https://github.com/spring-projects/spring-boot/wiki/Relaxed-Binding-2.0
 */
public class PropCorsConfigurationSource implements CorsConfigurationSource {

    private UrlPathHelper urlPathHelper = new UrlPathHelper();
    
    private PathMatcher pathMatcher = new AntPathMatcher();
    
    private PropertySource<?> propertySource;
    
    private String propPrefix = "cors";
    
    private long expirationTimeInSeconds = 0;
    
    private long trackTime;
    
    private Binder binder;
    
    private CorsConfigurationProperties corsConfigurationCache = null;
    
    public PropCorsConfigurationSource(String propPrefix, PropertySource<?> propertySource, long expirationTimeInSeconds) {
    	this(propPrefix, propertySource);
    	this.setExpirationTimeInSeconds(expirationTimeInSeconds);
    }
    
    public PropCorsConfigurationSource(String propPrefix, PropertySource<?> propertySource) {
        this.propertySource = propertySource;
        this.propPrefix = propPrefix;
        binder = new Binder(ConfigurationPropertySources.from(this.propertySource));
    }

    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        if (corsConfigurationCache == null) {
            processCorsConfiguration();
            trackTime = System.currentTimeMillis();
        }
 
        long nowTrackTime = System.currentTimeMillis();
        if (nowTrackTime > trackTime + (expirationTimeInSeconds * 1000)) {
            processCorsConfiguration();
            trackTime = nowTrackTime;
        }
        
        String lookupPath = this.urlPathHelper.getLookupPathForRequest(request);
        
        Optional<ItemCorsConfigProp> corsConfig = corsConfigurationCache.getConfigs().stream().
                filter((itemCorsConfig) -> this.pathMatcher.match(itemCorsConfig.getPathRequest(), lookupPath)).findFirst();
        
        if (corsConfig.isPresent()) {
            CorsConfiguration result = new CorsConfiguration();
            result.setAllowedOrigins(corsConfig.get().getAllowedOrigins());
            result.setAllowedMethods(corsConfig.get().getAllowedMethods());
            result.setAllowedHeaders(corsConfig.get().getAllowedHeaders());
            result.setMaxAge(corsConfig.get().getMaxAge());
            result.setAllowCredentials(corsConfig.get().getAllowCredentials());
            result.applyPermitDefaultValues();
            return result;
        }

        return null;
    }

    /**
     * 
     */
    private void processCorsConfiguration() {
        corsConfigurationCache = binder.bind(propPrefix, Bindable.of(CorsConfigurationProperties.class)).get();
    }

    public void setUrlPathHelper(UrlPathHelper urlPathHelper) {
        this.urlPathHelper = urlPathHelper;
    }

    public void setExpirationTimeInSeconds(long expirationTimeInSeconds) {
        this.expirationTimeInSeconds = expirationTimeInSeconds;
    }

    
    
}
