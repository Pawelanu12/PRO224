package api.szyszka.Controllers;

import api.szyszka.DTOs.CreatePostRequest;
import api.szyszka.DTOs.CreateSzostkaRequest;
import api.szyszka.DTOs.SzostkaDto;
import api.szyszka.Entities.Szostka;
import api.szyszka.Mappers.SzostkaMapper;
import api.szyszka.Services.SzostkaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
