package api.szyszka.Controllers;

import api.szyszka.DTOs.CreateZdjecieRequest;
import api.szyszka.DTOs.PostDto;
import api.szyszka.DTOs.UpdateZdjecieRequest;
import api.szyszka.DTOs.ZdjecieDto;
import api.szyszka.Entities.Zdjecie;
import api.szyszka.Mappers.SzostkaMapper;
import api.szyszka.Mappers.ZdjecieMapper;
import api.szyszka.Services.ZdjecieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/zdjecie")
public class ZdjecieController {

    private ZdjecieService zdjecieService;

    public ZdjecieController(ZdjecieService zdjecieService) {
        this.zdjecieService = zdjecieService;
    }

    @PostMapping
    public ResponseEntity<ZdjecieDto> createZdjecie(@RequestBody CreateZdjecieRequest request) {
        Zdjecie saved = zdjecieService.createZdjecie(request);

        return ResponseEntity
                .created(URI.create("/api/zdjecie" + saved.getId()))
                .body(ZdjecieMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ZdjecieDto> getZdjecieById(@PathVariable Long id) {
        Zdjecie zdjecie = zdjecieService.getZdjecieById(id);
        return ResponseEntity.ok(ZdjecieMapper.toDto(zdjecie));
    }

    @GetMapping
    public ResponseEntity<List<ZdjecieDto>> getAllZdjecies() {
        List<ZdjecieDto> zdjecies = zdjecieService.getAllZdjecies()
                .stream()
                .map(ZdjecieMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(zdjecies);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteZdjecie(@PathVariable Long id) {
        zdjecieService.deleteZdjecie(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ZdjecieDto> updateZdjecie(@PathVariable Long id,
                                                    @RequestBody UpdateZdjecieRequest request) {
        Zdjecie oldZdjecie = zdjecieService.getZdjecieById(id);

        ZdjecieMapper.updateEntity(oldZdjecie, request);
        Zdjecie update = zdjecieService.modifyZdjecieById(id, oldZdjecie);

        return ResponseEntity.ok(ZdjecieMapper.toDto(update));
    }
}
