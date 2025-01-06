package org.example.services;

import org.example.DTOs.UzytkownikDTO;
import org.example.entities.Uzytkownik;
import org.example.repositories.UzytkownikRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UzytkownikService {

    private final UzytkownikRepository uzytkownikRepository;

    public UzytkownikService(UzytkownikRepository uzytkownikRepository) {
        this.uzytkownikRepository = uzytkownikRepository;
    }

    //mapowanie encji na DTO
    private UzytkownikDTO mapToDTO(Uzytkownik uzytkownik) {
        UzytkownikDTO dto = new UzytkownikDTO();
        dto.setId(uzytkownik.getId());
        dto.setImie(uzytkownik.getImie());
        dto.setNazwisko(uzytkownik.getNazwisko());
        dto.setEmail(uzytkownik.getEmail());
        dto.setTypUzytkownika(uzytkownik.getTypUzytkownika());
        return dto;
    }

    // Dodanie użytkownika
    public Uzytkownik addUser(Uzytkownik uzytkownik) {
        return uzytkownikRepository.save(uzytkownik);
    }

    // Znajdź użytkownika po ID i zwróć jako DTO
    public UzytkownikDTO findUserAsDTO(Long id) {
        return uzytkownikRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));
    }

    // Znajdź użytkownika po ID (encja)
    public Optional<Uzytkownik> findUserById(Long id) {
        return uzytkownikRepository.findById(id);
    }

    // Znajdź wszystkich użytkowników i zamień na listę DTO
    public List<UzytkownikDTO> findAllUsersAsDTO() {
        return uzytkownikRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Usuń użytkownika po ID
    public void deleteUser(Long id) {
        if (uzytkownikRepository.existsById(id)) {
            uzytkownikRepository.deleteById(id);
        } else {
            throw new RuntimeException("Użytkownik o ID " + id + " nie istnieje");
        }
    }

    // Znajdź użytkownika po loginie i zwróć jako DTO
    public UzytkownikDTO findUserByLoginAsDTO(String login) {
        return uzytkownikRepository.findByLogin(login)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Użytkownik o loginie " + login + " nie istnieje"));
    }
}
