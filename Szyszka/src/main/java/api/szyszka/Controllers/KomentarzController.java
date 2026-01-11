package api.szyszka.Controllers;

import api.szyszka.DTOs.Post.CreateKomentarzRequest;
import api.szyszka.DTOs.Post.KomentarzDto;
import api.szyszka.DTOs.Post.UpdateKomentarzRequest;
import api.szyszka.Entities.Komentarz;
import api.szyszka.Mappers.KomentarzMapper;
import api.szyszka.Services.KomentarzService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/komentarz")
public class KomentarzController {

    private final KomentarzService komentarzService;

    public KomentarzController(KomentarzService komentarzService) {
        this.komentarzService = komentarzService;
    }

    @PostMapping
    public ResponseEntity<KomentarzDto> createKomentarz(@RequestBody CreateKomentarzRequest request) {
        Komentarz komentarz = komentarzService.CreateKomentarz(request);
        System.out.println(komentarz.getAutor().getLogin());
        return ResponseEntity
                .created(URI.create("/api/komentarz/" + komentarz.getId()))
                .body(KomentarzMapper.toDto(komentarz));
    }

    @GetMapping("/{id}")
    public ResponseEntity<KomentarzDto> getKomentarz(@PathVariable Long id) {
        Komentarz komentarz = komentarzService.GetKomentarzById(id);
        return ResponseEntity.ok(KomentarzMapper.toDto(komentarz));
    }

    @GetMapping
    public ResponseEntity<List<KomentarzDto>> getAllKomentarz() {
        List<KomentarzDto> komentarz = komentarzService.GetAllKomentarz()
                .stream()
                .map(KomentarzMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(komentarz);
    }

    @GetMapping("/autor/{id}")
    public ResponseEntity<List<KomentarzDto>> getAllKomentarzByAutor(@PathVariable Long id) {
        List<KomentarzDto> komentarz = komentarzService.getKomentarzByAutor(id)
                .stream()
                .map(KomentarzMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(komentarz);
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<List<KomentarzDto>> getAllKomentarzByPost(@PathVariable Long id) {
        List<KomentarzDto> komentarz = komentarzService.getKomentarzByPost(id)
                .stream()
                .map(KomentarzMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(komentarz);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteKomentarz(@PathVariable Long id) {
        komentarzService.deleteKomentarz(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<KomentarzDto> updateKomentarz(@PathVariable Long id,
                                                        @RequestBody UpdateKomentarzRequest request) {
        Komentarz oldKomentarz = komentarzService.GetKomentarzById(id);

        KomentarzMapper.updateEntity(oldKomentarz, request);
        Komentarz updated = komentarzService.modifyKomentarz(id, oldKomentarz);

        return ResponseEntity.ok(KomentarzMapper.toDto(updated));
    }
}
