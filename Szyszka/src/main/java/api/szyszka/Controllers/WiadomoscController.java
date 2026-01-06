package api.szyszka.Controllers;

import api.szyszka.DTOs.CreateWiadomoscRequest;
import api.szyszka.DTOs.UpdateWiadomoscRequest;
import api.szyszka.DTOs.WiadomoscDto;
import api.szyszka.Entities.Wiadomosc;
import api.szyszka.Mappers.WiadomoscMapper;
import api.szyszka.Services.WiadomoscService;
import api.szyszka.Services.ZdjecieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wiadomosc")
public class WiadomoscController {

    private final ZdjecieService zdjecieService;
    private WiadomoscService wiadomoscService;

    public WiadomoscController(WiadomoscService wiadomoscService, ZdjecieService zdjecieService) {
        this.wiadomoscService = wiadomoscService;
        this.zdjecieService = zdjecieService;
    }

    @PostMapping
    public ResponseEntity<WiadomoscDto> createWiadomosc(@RequestBody CreateWiadomoscRequest request) {
        Wiadomosc saved = wiadomoscService.createWiadomosc(request);

        return ResponseEntity
                .created(URI.create("/api/wiadomosc/" + saved.getId()))
                .body(WiadomoscMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WiadomoscDto> getWiadomoscById(@PathVariable Long id) {
        Wiadomosc wiadomosc = wiadomoscService.getWiadomoscById(id);
        return ResponseEntity.ok(WiadomoscMapper.toDto(wiadomosc));
    }

    @GetMapping
    public ResponseEntity<List<WiadomoscDto>> getAllWiadomosc() {
        List<WiadomoscDto> wiadomosci = wiadomoscService.getAllWiadomosc()
                .stream()
                .map(WiadomoscMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(wiadomosci);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWiadomosc(@PathVariable Long id) {
        wiadomoscService.deleteWiadomoscById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<WiadomoscDto> updateWiadomosc(@PathVariable Long id,
                                                        @RequestBody UpdateWiadomoscRequest request) {
        Wiadomosc update = wiadomoscService.modifyWiadomosc(id, request.getTresc());

        return ResponseEntity.ok(WiadomoscMapper.toDto(update));
    }
}
