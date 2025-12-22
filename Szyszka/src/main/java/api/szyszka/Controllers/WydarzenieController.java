package api.szyszka.Controllers;

import api.szyszka.DTOs.CreateWydarzenieRequest;
import api.szyszka.DTOs.UpdateWydarzenieRequest;
import api.szyszka.DTOs.WydarzenieDto;
import api.szyszka.Entities.Sprawnosc;
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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wydarzenie")
public class WydarzenieController {

    private final WydarzenieService wydarzenieService;

    public WydarzenieController(WydarzenieService wydarzenieService) {
        this.wydarzenieService = wydarzenieService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<WydarzenieDto> createWydarzenie(
            @RequestParam("nazwa") String nazwa,
            @RequestParam("opis") String opis,
            @RequestParam("dataWyjazdu") LocalDateTime dataWyjazdu,
            @RequestParam("dataZakonczenia") LocalDateTime dataZakonczenia,
            @RequestParam("organizatorId") Long organizatorId,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {

        CreateWydarzenieRequest request = new CreateWydarzenieRequest();
        try {
            if (files != null && !files.isEmpty()) {
                System.out.println(files.size());

                String uploadDir = System.getProperty("user.dir") + File.separator + "uploads" + File.separator +"wydarzenia";
                File folder = new File(uploadDir);
                if (!folder.exists()) {
                    folder.mkdirs();
                }

                for (MultipartFile file : files) {
                    if (file.isEmpty()) continue;

                    String time = System.currentTimeMillis() + "_";
                    String originalName = file.getOriginalFilename();
                    String cleanName = originalName.replaceAll("[^a-zA-Z0-9.\\-]", "_");

                    Path destination = Paths.get(uploadDir, time + cleanName);
                    Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

                    request.getZdjecia().add(time + cleanName);
                }

            }
        } catch (IOException e) {
            throw new RuntimeException("Błąd zapisu pliku: " + e.getMessage(), e);
        }

        request.setNazwa(nazwa);
        request.setOpis(opis);
        request.setDataWyjazdu(dataWyjazdu);
        request.setDataZakonczenia(dataZakonczenia);
        request.setOrganizatorId(organizatorId);

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

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<WydarzenieDto> updateWydarzenie(
            @PathVariable Long id,
            @ModelAttribute UpdateWydarzenieRequest request) {

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