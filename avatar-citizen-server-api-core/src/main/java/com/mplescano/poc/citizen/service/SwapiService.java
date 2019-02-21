package com.mplescano.poc.citizen.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

//@FeignClient(name = "swapiService", url = "${citizen.swapi.url}")
@Service
public class SwapiService {

    private final String swapiUrl;
    
    private final RestTemplate restTemplate;
    
	public SwapiService(@Value("${citizen.swapi.url}") String swapiUrl, RestTemplateBuilder restTemplateBuilder) {
        this.swapiUrl = swapiUrl;
        this.restTemplate = restTemplateBuilder.build();
    }

    //@RequestMapping(value = "/planets", method = RequestMethod.GET, produces = "application/json")
	public Map<String, Object> getPlanets(/*@RequestParam("search")*/ String searchPlanet) {
	    return restTemplate.exchange(swapiUrl + "/planets?search=" + searchPlanet, HttpMethod.GET, null, new ParameterizedTypeReference<HashMap<String, Object>>() {
        }).getBody();
	}

}
