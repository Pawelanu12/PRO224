package api.szyszka.Controllers;

import api.szyszka.DTOs.CzatDto;
import api.szyszka.DTOs.CzatSummaryDto;
import api.szyszka.Entities.Czat;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Mappers.CzatMapper;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Services.CzatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/czaty")
@RequiredArgsConstructor
public class CzatRestController {

    private final CzatService czatService;
    private final UzytkownikRepository uzytkownikRepository;

    @GetMapping("/my-czaty")
    public ResponseEntity<List<CzatSummaryDto>> getMyCzaty(@RequestParam Long userId) {
        Uzytkownik user = uzytkownikRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(null);
        }

        List<CzatSummaryDto> czaty = czatService.getCzatyForUser(user).stream()
                .map(CzatMapper::toSummaryDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(czaty);
    }

    // Pobranie pojedynczego czatu po ID
    @GetMapping("/{czatId}")
    public ResponseEntity<CzatDto> getCzat(@PathVariable Long czatId) {
        Czat czat = czatService.getCzatById(czatId);
        if (czat == null) {
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.ok(CzatMapper.toDto(czat));
    }
}