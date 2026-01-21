package api.szyszka.Controllers;

import api.szyszka.DTOs.Szostka.CreateSzostkaRequest;
import api.szyszka.DTOs.Szostka.SzostkaDto;
import api.szyszka.DTOs.Szostka.UpdateSzostkaRequest;
import api.szyszka.Entities.Szostka;
import api.szyszka.Mappers.SzostkaMapper;
import api.szyszka.Services.SzostkaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/szostka")
public class SzostkaController {

    private SzostkaService szostkaService;
    public SzostkaController(SzostkaService szostkaService) {this.szostkaService = szostkaService;}

    @PostMapping
    public ResponseEntity<SzostkaDto> createSzostka(@RequestBody CreateSzostkaRequest request) {
        Szostka szostka = SzostkaMapper.fromCreateRequest(request);
        Szostka saved =  szostkaService.create(szostka);

        return ResponseEntity
                .created(URI.create("/api/szostka/" + saved.getId()))
                .body(SzostkaMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SzostkaDto> getSzostkaByID(@PathVariable Long id) {
        Szostka szostka = szostkaService.getSzostkaById(id);
        return ResponseEntity.ok(SzostkaMapper.toDto(szostka));
    }

    @GetMapping
    public ResponseEntity<List<SzostkaDto>> getAllSzostka() {
        List<SzostkaDto> szostki = szostkaService.getAllSzostka()
                .stream()
                .map(SzostkaMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(szostki);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSzostka(@PathVariable Long id) {
        szostkaService.deleteSzostkaById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<SzostkaDto>  updateSzostka(@PathVariable Long id,
                                                     @RequestBody UpdateSzostkaRequest request) {
        Szostka oldSzostka = szostkaService.getSzostkaById(id);

        SzostkaMapper.updateEntity(oldSzostka, request);
        Szostka updated = szostkaService.modifySzostkaById(id, oldSzostka);

        return ResponseEntity.ok(SzostkaMapper.toDto(updated));

    }

    @PostMapping("/{id}/user")
    public ResponseEntity<SzostkaDto>  addUserToSzostka(@PathVariable Long id,
                                                     @RequestParam String login) {

        Szostka updated = szostkaService.addUserToSzostka(id, login);
        return ResponseEntity.ok(SzostkaMapper.toDto(updated));

    }

    @DeleteMapping("/{id}/user")
    public ResponseEntity<SzostkaDto>  deleteUserFromSzostka(@PathVariable Long id) {

        szostkaService.deleteUserFromSzostka(id);
        return ResponseEntity.noContent().build();


    }



}
