package com.mplescano.poc.citizen.service;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "swapiService", url = "${citizen.swapi.url}")
public interface SwapiService {

    @RequestMapping(value = "/planets", method = RequestMethod.GET, produces = "application/json")
	public Map<String, Object> getPlanets(@RequestParam("search") String searchPlanet);

}
