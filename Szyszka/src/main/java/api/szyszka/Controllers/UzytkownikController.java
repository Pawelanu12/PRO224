package api.szyszka.Controllers;

import api.szyszka.DTOs.*;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Mappers.UzytkownikMapper;
import api.szyszka.Services.UzytkownikService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
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

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY', 'ZUCH')")
    public ResponseEntity<UzytkownikDto> me(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(uzytkownikService.getCurrentUser(user.getUsername()));
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
    @PreAuthorize("hasAnyRole('DRUZYNOWY','PRZYBOCZNY')")
    public ResponseEntity<List<UzytkownikDto>> getAllUsers() {
        List<UzytkownikDto> users = uzytkownikService.getAllUsers()
                .stream()
                .map(UzytkownikMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }
    @GetMapping("/children")
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY')")
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
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY')")
    public ResponseEntity<List<UzytkownikDto>> getParents(@PathVariable Long id) {
        List<UzytkownikDto> parents = uzytkownikService.getParents(id)
                .stream()
                .map(UzytkownikMapper::toDto)
                .toList();

        return ResponseEntity.ok(parents);
    }
    @GetMapping("/typ/{typ}")
    public ResponseEntity<List<UzytkownikDto>> getUsersByTyp(@PathVariable String typ) {
        List<UzytkownikDto> users = uzytkownikService.getUsersByType(typ)
                .stream()
                .map(UzytkownikMapper::toDto)
                .toList();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/szostka/{szostkaId}")
    public ResponseEntity<List<UzytkownikDto>> getUsersBySzostka(@PathVariable Long szostkaId){
        List<UzytkownikDto> users = uzytkownikService.getUsersBySzostka(szostkaId)
                .stream()
                .map(UzytkownikMapper::toDto)
                .toList();
        return ResponseEntity.ok(users);
    }
    @PutMapping("/{id}")
    @PreAuthorize("@uzytkownikSecurity.canUpdateUser(#id, principal)")
    public ResponseEntity<UzytkownikDto> updateUser(@PathVariable Long id,
                                                    @RequestBody UpdateUzytkownikRequest request) {
        Uzytkownik existing = uzytkownikService.getUserById(id);

        UzytkownikMapper.updateEntity(existing, request);
        Uzytkownik updated = uzytkownikService.updateUser(id, existing);

        return ResponseEntity.ok(UzytkownikMapper.toDto(updated));
    }

    @PreAuthorize("hasRole('DRUZYNOWY')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        uzytkownikService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
