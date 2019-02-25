package com.mplescano.poc.citizen.component.constraint;

import java.util.List;
import java.util.Map;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.mplescano.poc.citizen.service.SwapiService;

public class SwapiPlanetValidator implements ConstraintValidator<SwapiPlanet, String> {

    private final SwapiService swapiService;

    public SwapiPlanetValidator(SwapiService swapiService) {
        this.swapiService = swapiService;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        Map<String, Object> searchedPlanets = swapiService.getPlanets(value);

        List<Map<String, Object>> resultPlanets = (List<Map<String, Object>>) searchedPlanets.get("results");

        if (!(resultPlanets.size() == 0 || resultPlanets.size() > 1)) {
            return true;
        }

        return false;
    }

}
