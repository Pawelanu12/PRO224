package api.szyszka.Controllers;

import api.szyszka.DTOs.CreateZdobytaSprawnoscRequest;
import api.szyszka.DTOs.UpdateZdobytaSprawnoscRequest;
import api.szyszka.DTOs.ZdobytaSprawnoscDto;
import api.szyszka.Entities.ZdobytaSprawnosc;
import api.szyszka.Mappers.ZdobytaSprawnoscMapper;
import api.szyszka.Services.ZdobytaSprawnoscService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/zdobytaSprawnosc")
public class ZdobytaSprawnoscController {
    private ZdobytaSprawnoscService zdobytaSprawnoscService;

//    public ZdobytaSprawnoscController(ZdobytaSprawnoscService zdobytaSprawnoscServiceservice) {
//        this.zdobytaSprawnoscService = zdobytaSprawnoscService;
//    }
    public ZdobytaSprawnoscController(ZdobytaSprawnoscService zdobytaSprawnoscService) {
        this.zdobytaSprawnoscService = zdobytaSprawnoscService;
    }

    @PostMapping
    public ResponseEntity<ZdobytaSprawnoscDto> createZdobytaSprawnosc(@RequestBody CreateZdobytaSprawnoscRequest request) {
        ZdobytaSprawnosc saved = zdobytaSprawnoscService.createZdobytaSprawnosc(request);

        return ResponseEntity
                .created(URI.create("/api/zdobytaSprawnosc/" + saved.getId()))
                .body(ZdobytaSprawnoscMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ZdobytaSprawnoscDto> getZdobytaSprawnosc(@PathVariable Long id) {
        ZdobytaSprawnosc zdobytaSprawnosc = zdobytaSprawnoscService.getZdobytaSprawnoscById(id);
        return ResponseEntity.ok(ZdobytaSprawnoscMapper.toDto(zdobytaSprawnosc));
    }

    @GetMapping("/sprawnosc/{id}")
    public ResponseEntity<List<ZdobytaSprawnoscDto>> getAllBySprawnoscId(@PathVariable Long id) {
        List<ZdobytaSprawnoscDto> zdobyteSprawnosci = zdobytaSprawnoscService.getAllZdobytaSprawnoscBySprawnoscId(id)
                .stream()
                .map(ZdobytaSprawnoscMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(zdobyteSprawnosci);
    }

    @GetMapping("/uzytkownik/{id}")
    public ResponseEntity<List<ZdobytaSprawnoscDto>> getAllByUzytkownikId(@PathVariable Long id) {
        List<ZdobytaSprawnoscDto> zdobyteSprawnosci = zdobytaSprawnoscService.getAllZdobytaSprawnoscByUzytkownikId(id)
                .stream()
                .map(ZdobytaSprawnoscMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(zdobyteSprawnosci);
    }

    @GetMapping
    public ResponseEntity<List<ZdobytaSprawnoscDto>> getAllZdobytaSprawnosc() {
        List<ZdobytaSprawnoscDto> zdobyteSprawnosci = zdobytaSprawnoscService.getAllZdobytaSprawnosc()
                .stream()
                .map(ZdobytaSprawnoscMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(zdobyteSprawnosci);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteZdobytaSprawnosc(@PathVariable Long id) {
        zdobytaSprawnoscService.deleteZdobytaSprawnoscById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ZdobytaSprawnoscDto> updateZdobytaSprawnosc(@PathVariable Long id,
                                                                      @RequestBody UpdateZdobytaSprawnoscRequest request) {
        ZdobytaSprawnosc oldZdobytaSprawmosc = zdobytaSprawnoscService.getZdobytaSprawnoscById(id);

        ZdobytaSprawnoscMapper.updateEntity(oldZdobytaSprawmosc, request);
        ZdobytaSprawnosc updated = zdobytaSprawnoscService.modifyZdobytaSprawnosc(id, oldZdobytaSprawmosc);

        return ResponseEntity.ok(ZdobytaSprawnoscMapper.toDto(updated));
    }
}
