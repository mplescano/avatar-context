package com.mplescano.poc.citizen.service;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "swapiService", url = "${citizen.swapi.url}")
public interface SwapiService {

	@GetMapping("/planets")
	Map<String, Object> getPlanets(@RequestParam("search") String searchPlanet);

}
