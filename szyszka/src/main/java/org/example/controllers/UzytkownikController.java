package org.example.controllers;

import org.example.DTOs.UzytkownikDTO;
import org.example.services.UzytkownikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/uzytkownicy")
public class UzytkownikController {

    private final UzytkownikService uzytkownikService;

    @Autowired
    public UzytkownikController(UzytkownikService uzytkownikService) {
        this.uzytkownikService = uzytkownikService;
    }

    // Endpoint dla wszystkich użytkowników
    @GetMapping("/all")
    public List<UzytkownikDTO> getAllUzytkownicy() {
        return uzytkownikService.getAllUzytkownicy();
    }

    // Endpoint dla użytkownika po ID
    @GetMapping("/{id}")
    public ResponseEntity<UzytkownikDTO> getUzytkownikById(@PathVariable Long id) {
        UzytkownikDTO uzytkownik = uzytkownikService.getUzytkownikById(id);
        return uzytkownik != null ? ResponseEntity.ok(uzytkownik) : ResponseEntity.notFound().build();
    }

    // Endpoint dla użytkownika po loginie
    @GetMapping("/login/{login}")
    public ResponseEntity<UzytkownikDTO> getUzytkownikByLogin(@PathVariable String login) {
        UzytkownikDTO uzytkownik = uzytkownikService.getUzytkownikByLogin(login);
        return uzytkownik != null ? ResponseEntity.ok(uzytkownik) : ResponseEntity.notFound().build();
    }

    // Endpoint dla użytkowników po nazwisku
    @GetMapping("/nazwisko/{nazwisko}")
    public List<UzytkownikDTO> findUzytkownikByLastName(@PathVariable String nazwisko) {
        return uzytkownikService.findUzytkownikByLastName(nazwisko);
    }

    // Endpoint do zapisywania użytkownika
    @PostMapping
    public ResponseEntity<UzytkownikDTO> saveUzytkownik(@RequestBody UzytkownikDTO uzytkownikDTO) {
        UzytkownikDTO savedUzytkownik = uzytkownikService.saveUzytkownik(uzytkownikDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUzytkownik);
    }

    // Endpoint do usuwania użytkownika
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUzytkownik(@PathVariable Long id) {
        uzytkownikService.deleteUzytkownik(id);
        return ResponseEntity.noContent().build();
    }
}
