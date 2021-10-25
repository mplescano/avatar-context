package com.mplescano.poc.citizen.repository.main;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.mplescano.poc.citizen.model.entity.main.Citizen;

@Repository
public interface CitizenRepository
        extends JpaRepository<Citizen, Integer>, JpaSpecificationExecutor<Citizen> {

}
