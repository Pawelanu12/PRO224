package org.example.services;

import org.example.DTOs.UzytkownikDTO;
import org.example.entities.Uzytkownik;
import org.example.mappers.UzytkownikMapper;
import org.example.repositories.UzytkownikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UzytkownikService {

    private final UzytkownikRepository uzytkownikRepository;

    @Autowired
    public UzytkownikService(UzytkownikRepository uzytkownikRepository) {
        this.uzytkownikRepository = uzytkownikRepository;
    }

    public List<UzytkownikDTO> getAllUzytkownicy() {
        return uzytkownikRepository.findAll()
                .stream()
                .map(UzytkownikMapper::toDTO)
                .collect(Collectors.toList());
    }

    public UzytkownikDTO getUzytkownikById(Long id) {
        Optional<Uzytkownik> uzytkownik = uzytkownikRepository.findById(id);
        return uzytkownik.map(UzytkownikMapper::toDTO).orElse(null);
    }

    public UzytkownikDTO getUzytkownikByLogin(String login) {
        Optional<Uzytkownik> optionalUzytkownik = uzytkownikRepository.findByLogin(login);
        return optionalUzytkownik.map(UzytkownikMapper::toDTO).orElse(null);
    }
    public List<UzytkownikDTO> findUzytkownikByLastName(String nazwisko) {
        return uzytkownikRepository.findByNazwiskoContaining(nazwisko)
                .stream()
                .map(UzytkownikMapper::toDTO)
                .collect(Collectors.toList());
    }

    public UzytkownikDTO saveUzytkownik(UzytkownikDTO uzytkownikDTO) {
        Uzytkownik uzytkownik = UzytkownikMapper.toEntity(uzytkownikDTO);
        Uzytkownik saved = uzytkownikRepository.save(uzytkownik);
        return UzytkownikMapper.toDTO(saved);
    }

    public void deleteUzytkownik(Long id) {
        uzytkownikRepository.deleteById(id);
    }
}
