package api.szyszka.Controllers;

import api.szyszka.DTOs.CreateWydarzenieRequest;
import api.szyszka.DTOs.UpdateWydarzenieRequest;
import api.szyszka.DTOs.WydarzenieDto;
import api.szyszka.Entities.Szostka;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Mappers.WydarzenieMapper;
import api.szyszka.Services.SzostkaService;
import api.szyszka.Services.WydarzenieService;
import api.szyszka.Services.ZdjecieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wadyrzenie")
public class WydarzenieController {

    private final ZdjecieService zdjecieService;
    private WydarzenieService wydarzenieService;

    public WydarzenieController(WydarzenieService wydarzenieService, ZdjecieService zdjecieService) {
        this.wydarzenieService = wydarzenieService;
        this.zdjecieService = zdjecieService;
    }

    @PostMapping
    public ResponseEntity<WydarzenieDto> createWydarzenie(@RequestBody CreateWydarzenieRequest request) {
        Wydarzenie wydarzenie = WydarzenieMapper.fromCreateRequest(request);
        Wydarzenie saved = wydarzenieService.createWydarzenie(wydarzenie);

        return ResponseEntity
                .created(URI.create("/api/wydarzenie" + saved.getId()))
                .body(WydarzenieMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WydarzenieDto> getWydarzenie(@PathVariable Long id) {
        Wydarzenie wydarzenie = wydarzenieService.getWydarzenieById(id);
        return ResponseEntity.ok(WydarzenieMapper.toDto(wydarzenie));
    }

    @GetMapping
    public ResponseEntity<List<WydarzenieDto>> getAllWydarzenies() {
        List<WydarzenieDto> wydarzenia = wydarzenieService.getAllWydarzenia()
                .stream()
                .map(WydarzenieMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(wydarzenia);
    }

    @GetMapping("/nazwa/{nazwa}")
    public ResponseEntity<WydarzenieDto> getWydarzenieByNazwa(@PathVariable String nazwa) {
        Wydarzenie wydarzenie = wydarzenieService.getWydarzenieByNazwa(nazwa);
        return ResponseEntity.ok(WydarzenieMapper.toDto(wydarzenie));
    }

    @GetMapping("/datawyjazdu/{data}")
    public ResponseEntity<WydarzenieDto> getWydarzenieByDataWyjazdu(@PathVariable LocalDateTime data) {
        Wydarzenie wydarzenie = wydarzenieService.getWydarzenieByDataWyjazdu(data);
        return ResponseEntity.ok(WydarzenieMapper.toDto(wydarzenie));
    }

    @GetMapping("/datazkoczenie/{data}")
    public ResponseEntity<WydarzenieDto> getWydarzenieByDataZakonczenia(@PathVariable LocalDateTime data) {
        Wydarzenie wydarzenie = wydarzenieService.getWydarzenieByDataZakonczenia(data);
        return ResponseEntity.ok(WydarzenieMapper.toDto(wydarzenie));
    }

    @GetMapping("/zakreswyjazdu/{data1}/{data2}")
    public  ResponseEntity<List<WydarzenieDto>> getWyjazduByDateRange(@PathVariable LocalDateTime data1, @PathVariable LocalDateTime data2) {
         List<WydarzenieDto> wydarzenia = wydarzenieService.getWyjazduByDateRange(data1, data2)
                .stream()
                .map(WydarzenieMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(wydarzenia);
    }

    @GetMapping("/zakresprzyjazdu/{data1}/{data2}")
    public  ResponseEntity<List<WydarzenieDto>> getPrzyjazduByDateRange(@PathVariable LocalDateTime data1, @PathVariable LocalDateTime data2) {
        List<WydarzenieDto> wydarzenia = wydarzenieService.getPrzyjazduByDateRange(data1, data2)
                .stream()
                .map(WydarzenieMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(wydarzenia);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWydarzenie(@PathVariable Long id) {
        wydarzenieService.deleteWydarzenie(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<WydarzenieDto> updateWydarzenie(@PathVariable Long id,
                                                          @RequestBody UpdateWydarzenieRequest request) {
        Wydarzenie oldWydarzenie = wydarzenieService.getWydarzenieById(id);

        WydarzenieMapper.updateEntity(oldWydarzenie, request);
        Wydarzenie updated = wydarzenieService.modifyWydarzenie(id, oldWydarzenie);

        return ResponseEntity.ok(WydarzenieMapper.toDto(updated));
    }

}
