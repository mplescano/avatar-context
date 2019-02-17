package com.mplescano.poc.citizen.component.cors;

import java.util.ArrayList;
import java.util.List;

public class CorsConfigurationProperties {

    private List<ItemCorsConfigProp> configs = new ArrayList<>();
    
    public List<ItemCorsConfigProp> getConfigs() {
        return configs;
    }

    public void setConfigs(List<ItemCorsConfigProp> configs) {
        this.configs = configs;
    }

    static class ItemCorsConfigProp {
        
        private String pathRequest;
        
        private Long maxAge;
        
        private Boolean allowCredentials;
        
        private List<String> allowedOrigins;
        
        private List<String> allowedMethods;
        
        private List<String> allowedHeaders;

        public String getPathRequest() {
            return pathRequest;
        }

        public void setPathRequest(String pathRequest) {
            this.pathRequest = pathRequest;
        }

        public List<String> getAllowedOrigins() {
            return allowedOrigins;
        }

        public void setAllowedOrigins(List<String> allowedOrigins) {
            this.allowedOrigins = allowedOrigins;
        }

        public List<String> getAllowedMethods() {
            return allowedMethods;
        }

        public void setAllowedMethods(List<String> allowedMethods) {
            this.allowedMethods = allowedMethods;
        }

        public List<String> getAllowedHeaders() {
            return allowedHeaders;
        }

        public void setAllowedHeaders(List<String> allowedHeaders) {
            this.allowedHeaders = allowedHeaders;
        }

        public Long getMaxAge() {
            return maxAge;
        }

        public void setMaxAge(Long maxAge) {
            this.maxAge = maxAge;
        }

        public Boolean getAllowCredentials() {
            return allowCredentials;
        }

        public void setAllowCredentials(Boolean allowCredentials) {
            this.allowCredentials = allowCredentials;
        }
        
    }
}
