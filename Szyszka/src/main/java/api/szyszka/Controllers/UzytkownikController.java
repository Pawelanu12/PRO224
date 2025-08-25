package api.szyszka.Controllers;

import api.szyszka.DTOs.*;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Mappers.UzytkownikMapper;
import api.szyszka.Services.UzytkownikService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/uzytkownicy")
public class UzytkownikController {

    private final UzytkownikService uzytkownikService;

    public UzytkownikController(UzytkownikService uzytkownikService) {
        this.uzytkownikService = uzytkownikService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<UzytkownikDto> createUser(@RequestBody CreateUzytkownikRequest request) {
        Uzytkownik user = UzytkownikMapper.fromCreateRequest(request);
        Uzytkownik saved = uzytkownikService.createUser(user);

        return ResponseEntity
                .created(URI.create("/api/uzytkownicy/" + saved.getId()))
                .body(UzytkownikMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UzytkownikDto> getUserById(@PathVariable Long id) {
        Uzytkownik user = uzytkownikService.getUserById(id);
        return ResponseEntity.ok(UzytkownikMapper.toDto(user));
    }

    @GetMapping
    public ResponseEntity<List<UzytkownikDto>> getAllUsers() {
        List<UzytkownikDto> users = uzytkownikService.getAllUsers()
                .stream()
                .map(UzytkownikMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }
    @GetMapping("/children")
    public ResponseEntity<List<UzytkownikDto>> getChildren(
            @RequestParam(required = false) Long parentId1,
            @RequestParam(required = false) Long parentId2) {

        List<UzytkownikDto> children = uzytkownikService.getChildren(parentId1, parentId2)
                .stream()
                .map(UzytkownikMapper::toDto)
                .toList();

        return ResponseEntity.ok(children);
    }
    @GetMapping("/parents/{id}")
    public ResponseEntity<List<UzytkownikDto>> getParents(@PathVariable Long id) {
        List<UzytkownikDto> parents = uzytkownikService.getParents(id)
                .stream()
                .map(UzytkownikMapper::toDto)
                .toList();

        return ResponseEntity.ok(parents);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UzytkownikDto> updateUser(@PathVariable Long id,
                                                    @RequestBody UpdateUzytkownikRequest request) {
        Uzytkownik existing = uzytkownikService.getUserById(id);

        UzytkownikMapper.updateEntity(existing, request);
        Uzytkownik updated = uzytkownikService.updateUser(id, existing);

        return ResponseEntity.ok(UzytkownikMapper.toDto(updated));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        uzytkownikService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
