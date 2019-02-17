package com.mplescano.poc.citizen.component.cors;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.cors.CorsConfigurationSource;

@Order(Ordered.HIGHEST_PRECEDENCE)
public class HighestPrecedenceCorsFilter extends org.springframework.web.filter.CorsFilter {

    public HighestPrecedenceCorsFilter(CorsConfigurationSource configSource) {
        super(configSource);
    }

}