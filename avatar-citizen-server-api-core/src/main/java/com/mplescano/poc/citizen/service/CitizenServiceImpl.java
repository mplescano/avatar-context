package com.mplescano.poc.citizen.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mplescano.poc.citizen.model.entity.main.Citizen;
import com.mplescano.poc.citizen.repository.main.CitizenRepository;

@Service
public class CitizenServiceImpl implements CitizenService {

    private final CitizenRepository citizenRepository;

    public CitizenServiceImpl(CitizenRepository reminderRepository) {
        this.citizenRepository = reminderRepository;
    }

    @Override
    public Citizen find(Integer id) {
        return citizenRepository.findById(id).get();
    }

    @Override
    public Page<Citizen> findList(Pageable pageable) {
        return citizenRepository.findAll(pageable);
    }

    @Override
    public List<Citizen> findList() {
        return citizenRepository.findAll();
    }

    @Override
    public Citizen save(Citizen input) {
        return citizenRepository.save(input);
    }

    @Override
    public int delete(Integer citizenId) {
        citizenRepository.deleteById(citizenId);;
        return 1;
    }

}
