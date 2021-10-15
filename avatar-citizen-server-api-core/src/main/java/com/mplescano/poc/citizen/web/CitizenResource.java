package com.mplescano.poc.citizen.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.ImmutableMap;
import com.mplescano.poc.citizen.model.dto.ResponseMessage;
import com.mplescano.poc.citizen.model.entity.main.Citizen;
import com.mplescano.poc.citizen.service.CitizenService;

@RestController
public class CitizenResource extends AbstractResourceController {

    private final CitizenService citizenService;

    public CitizenResource(CitizenService citizenService) {
        this.citizenService = citizenService;
    }

    @GetMapping("/citizens")
    public Page<Citizen> findCitizens(@SortDefault(sort = { "name" }, direction = Direction.ASC) Pageable pageable) {
        return citizenService.findList(pageable);
    }

    @GetMapping("/citizens/{citizenId}")
    public Citizen findCitizen(@PathVariable("citizenId") Integer citizenId, HttpServletRequest request) {
        return citizenService.find(citizenId);
    }

    @PostMapping("/citizens")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseMessage insertCitizen(@Validated @RequestBody Citizen input) {
        input = citizenService.save(input);
        return new ResponseMessage("Citizen created", ImmutableMap.of("id", input.getId()));
    }

    @PutMapping("/citizens/{citizenId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseMessage updateReminder(@PathVariable("citizenId") Integer citizenId,
                                          @Validated @RequestBody Citizen input) {
        input.setId(citizenId);
        Citizen citizenDb = citizenService.find(citizenId);

        citizenDb.setGender(input.getGender());
        citizenDb.setHairColor(input.getHairColor());
        citizenDb.setHeight(input.getHeight());
        citizenDb.setMass(input.getMass());
        citizenDb.setName(input.getName());
        citizenDb.setPlanet(input.getPlanet());
        citizenService.save(citizenDb);

        return new ResponseMessage("Citizen successfuly modified");
    }

    @DeleteMapping("/citizens/{citizenIds}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseMessage deleteReminder(@PathVariable("citizenIds") int[] citizenIds) {
    	citizenService.delete(citizenIds[0]);
        return new ResponseMessage("Successfuly deleted the item of id " + citizenIds[0] + ".");
    }
}
