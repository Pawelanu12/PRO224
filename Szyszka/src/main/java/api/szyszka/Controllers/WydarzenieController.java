package api.szyszka.Controllers;

import api.szyszka.DTOs.CreateWydarzenieRequest;
import api.szyszka.DTOs.UpdateWydarzenieRequest;
import api.szyszka.DTOs.WydarzenieDto;
import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Mappers.WydarzenieMapper;
import api.szyszka.Services.WydarzenieService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wydarzenia")
public class WydarzenieController {

    private final WydarzenieService wydarzenieService;

    public WydarzenieController(WydarzenieService wydarzenieService) {
        this.wydarzenieService = wydarzenieService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<WydarzenieDto> createWydarzenie(
            @RequestPart("wydarzenie") CreateWydarzenieRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {

        Wydarzenie saved = wydarzenieService.createWydarzenieWithPhotos(request, files);
        return ResponseEntity.ok(WydarzenieMapper.toDto(saved));
    }

    @PostMapping("/{id}/zdjecia")
    public ResponseEntity<WydarzenieDto> addZdjecie(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        Wydarzenie updated = wydarzenieService.addZdjecieToEvent(id, file);
        return ResponseEntity.ok(WydarzenieMapper.toDto(updated));
    }

    @GetMapping
    public ResponseEntity<List<WydarzenieDto>> getAll() {
        List<WydarzenieDto> list = wydarzenieService.getAllWydarzenia()
                .stream()
                .map(WydarzenieMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WydarzenieDto> getById(@PathVariable Long id) {
        Wydarzenie w = wydarzenieService.getWydarzenieById(id);
        return ResponseEntity.ok(WydarzenieMapper.toDto(w));
    }

    @GetMapping("/nazwa/{nazwa}")
    public ResponseEntity<WydarzenieDto> getByNazwa(@PathVariable String nazwa) {
        Wydarzenie w = wydarzenieService.getWydarzenieByNazwa(nazwa);
        return ResponseEntity.ok(WydarzenieMapper.toDto(w));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WydarzenieDto> updateWydarzenie(
            @PathVariable Long id,
            @RequestBody UpdateWydarzenieRequest request) {

        Wydarzenie updated = wydarzenieService.modifyWydarzenie(id, request);
        return ResponseEntity.ok(WydarzenieMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        wydarzenieService.deleteWydarzenie(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/zdjecia/{fileName}")
    public ResponseEntity<Resource> getZdjecie(@PathVariable String fileName) throws IOException {
        File file = new File("uploads/" + fileName);
        if (!file.exists()) return ResponseEntity.notFound().build();

        Resource resource = new FileSystemResource(file);
        String contentType = Files.probeContentType(file.toPath());
        if (contentType == null) contentType = "application/octet-stream";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
