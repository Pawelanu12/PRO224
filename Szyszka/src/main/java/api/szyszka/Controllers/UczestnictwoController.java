package api.szyszka.Controllers;

import api.szyszka.DTOs.CreateUczestnictwoRequest;
import api.szyszka.DTOs.UczestnictwoDto;
import api.szyszka.Entities.Uczestnictwo;
import api.szyszka.Mappers.UczestnictwoMapper;
import api.szyszka.Mappers.ZdjecieMapper;
import api.szyszka.Services.UczestnictwoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/uczestnictwo")
public class UczestnictwoController {
    private final UczestnictwoService uczestnictwoService;

    public UczestnictwoController(UczestnictwoService uczestnictwoService) {
        this.uczestnictwoService = uczestnictwoService;
    }

    @PostMapping
    public ResponseEntity<UczestnictwoDto> createUczestnictwo(@RequestBody CreateUczestnictwoRequest request) {
        Uczestnictwo uczestnictwo = UczestnictwoMapper.fromCreateRequest(request);
        Uczestnictwo saved = uczestnictwoService.createUczestnictwo(uczestnictwo);

        return ResponseEntity
                .created(URI.create("/api/uczestnictwo/" + saved.getId()))
                .body(UczestnictwoMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UczestnictwoDto> getUczestnictwoById(@PathVariable Long id) {
        Uczestnictwo uczestnictwo = uczestnictwoService.getUczestnictwoById(id);
        return ResponseEntity.ok(UczestnictwoMapper.toDto(uczestnictwo));
    }

    @GetMapping
    public ResponseEntity<List<UczestnictwoDto>> getUczestnictwos() {
        List<UczestnictwoDto> uczestnictwa = uczestnictwoService.getAllUczestnictwo()
                .stream()
                .map(UczestnictwoMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(uczestnictwa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUczestnictwo(@PathVariable Long id) {
        uczestnictwoService.deleteUczestnictwoById(id);
        return ResponseEntity.noContent().build();
    }

}
