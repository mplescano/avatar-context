package com.mplescano.poc.citizen.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mplescano.poc.citizen.model.entity.main.Citizen;

public interface CitizenService {

    Citizen find(Integer id);
    
    Page<Citizen> findList(Pageable pageable);
    
    List<Citizen> findList();
    
    Citizen save(Citizen input);
    
    int delete(Integer citizenId);
}
