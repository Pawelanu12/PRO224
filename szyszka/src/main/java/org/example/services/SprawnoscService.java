package org.example.services;

import org.example.entities.Sprawnosc;
import org.example.repositories.*;
import org.example.repositories.SprawnoscRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class SprawnoscService {


    @Autowired
    private SprawnoscRepository sprawnoscRepository;

    public List<Sprawnosc> findAll() {
        return sprawnoscRepository.findAll();
    }

    public Optional<Sprawnosc> findById(Long id) {
        return sprawnoscRepository.findById(id);
    }


    public void deleteById(Long id) {
        sprawnoscRepository.deleteById(id);
    }
}