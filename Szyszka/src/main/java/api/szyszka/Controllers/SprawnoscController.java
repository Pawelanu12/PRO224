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
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sprawnosc")
public class SprawnoscController {

    private final SzostkaService szostkaService;
    private SprawnoscService sprawnoscService;

    public SprawnoscController(SprawnoscService sprawnoscService, SzostkaService szostkaService) {
        this.sprawnoscService = sprawnoscService;
        this.szostkaService = szostkaService;
    }
    @GetMapping("/ikona/{fileName}")
    public ResponseEntity<Resource> getIkona(@PathVariable String fileName) {
        try {
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File file = new File(uploadDir + fileName);

            if (!file.exists()) {
                System.out.println("Brak pliku: " + file.getAbsolutePath());
                return ResponseEntity.notFound().build();
            }

            Resource resource = new FileSystemResource(file);

            // Automatyczne rozpoznanie typu:
            String contentType = Files.probeContentType(file.toPath());
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SprawnoscDto> createSprawnosc(
            @RequestParam("nazwa") String nazwa,
            @RequestParam("opis") String opis,
            @RequestParam("opisWymagan") String opisWymagan,
            @RequestParam(value = "ikona", required = false) MultipartFile ikona,
            @RequestParam("typ") String typ
    ) {
        String iconFileName = null;
        System.out.println("cat");
        try {
            if (ikona != null && !ikona.isEmpty()) {
                System.out.println("file");

                String uploadDir = System.getProperty("user.dir") + "/uploads/";

                File folder = new File(uploadDir);
                if (!folder.exists()) {
                    folder.mkdirs();
                }

                String originalName = ikona.getOriginalFilename();
                File targetFile = new File(uploadDir + originalName);

                ikona.transferTo(targetFile);
                iconFileName = originalName;
            }
        } catch (IOException e) {
            throw new RuntimeException("Błąd zapisu pliku: " + e.getMessage());
        }

        Sprawnosc sprawnosc = new Sprawnosc();
        sprawnosc.setNazwa(nazwa);
        sprawnosc.setOpis(opis);
        sprawnosc.setOpisWymagan(opisWymagan);
        sprawnosc.setIkona(iconFileName);

        Sprawnosc saved = sprawnoscService.createSprawnosc(sprawnosc);

        return ResponseEntity
                .created(URI.create("/api/sprawnosc/" + saved.getId()))
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
