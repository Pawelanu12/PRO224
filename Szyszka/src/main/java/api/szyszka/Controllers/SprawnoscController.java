package api.szyszka.Controllers;

import api.szyszka.DTOs.CreateSprawnoscRequest;
import api.szyszka.DTOs.SprawnoscDto;
import api.szyszka.DTOs.UpdateSprawnoscRequest;
import api.szyszka.Entities.Sprawnosc;
import api.szyszka.Entities.Szostka;
import api.szyszka.Mappers.SprawnoscMapper;
import api.szyszka.Mappers.SzostkaMapper;
import api.szyszka.Services.SprawnoscService;
import api.szyszka.Services.SzostkaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/sprawnosc")
public class SprawnoscController {

    private final SzostkaService szostkaService;
    private SprawnoscService sprawnoscService;

    public SprawnoscController(SprawnoscService sprawnoscService, SzostkaService szostkaService) {
        this.sprawnoscService = sprawnoscService;
        this.szostkaService = szostkaService;
    }

    @PostMapping
    public ResponseEntity<SprawnoscDto> createSprawnosc(@RequestBody CreateSprawnoscRequest request) {
        Sprawnosc sprawnosc = SprawnoscMapper.fromCreateRequest(request);
        Sprawnosc saved = sprawnoscService.createSprawnosc(sprawnosc);

        return ResponseEntity
                .created(URI.create("/api/Sprawnosc/" + saved.getId()))
                .body(SprawnoscMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SprawnoscDto> getSprawnoscById(@PathVariable Long id) {
        Sprawnosc sprawnosc = sprawnoscService.getSprawnoscById(id);
        return ResponseEntity.ok(SprawnoscMapper.toDto(sprawnosc));
    }

    @GetMapping
    public ResponseEntity<List<SprawnoscDto>> getAllSprawnosc() {
        List<SprawnoscDto> sprawnosci = sprawnoscService.getAllSprawnosc()
                .stream()
                .map(SprawnoscMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(sprawnosci);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSprawnosc(@PathVariable Long id) {
        sprawnoscService.deleteSprawnosc(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<SprawnoscDto> updateSprawnosc(@PathVariable Long id,
                                                        @RequestBody UpdateSprawnoscRequest request) {
        Sprawnosc oldSprawnosc = sprawnoscService.getSprawnoscById(id);

        SprawnoscMapper.updateEntity(oldSprawnosc, request);
        Sprawnosc updated = sprawnoscService.modifySprawnoscById(id, oldSprawnosc);

        return ResponseEntity.ok(SprawnoscMapper.toDto(updated));
    }
}
