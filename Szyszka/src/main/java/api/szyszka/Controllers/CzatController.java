package api.szyszka.Controllers;

import api.szyszka.DTOs.Chat.*;
import api.szyszka.Entities.Czat;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Mappers.CzatMapper;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Services.CzatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/czaty")
@RequiredArgsConstructor
public class CzatController {

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
    @PostMapping()
    public ResponseEntity<CzatDto>createPrivateCzat(@RequestBody CreatePrivateChatRequest req) {
      Czat czat=czatService.createPrivateChat(
              req.getUser1Login(),
              req.getUser2Login()
      );
        return ResponseEntity.ok(CzatMapper.toDto(czat));
    }
    @PostMapping("/group")
    public ResponseEntity<CzatDto> createGroupChat(@RequestBody CreateGroupChatRequest request) {
        System.out.println("cat");
        Uzytkownik creator = uzytkownikRepository.findByLogin(request.getCreatorLogin())
                .orElseThrow(() -> new RuntimeException("Creator not found"));
        Czat czat = czatService.createGroupChat(
                request.getNazwa(),
                request.getCreatorLogin(),
                request.getParticipantLogins()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(CzatMapper.toDto(czat));
    }

    @PutMapping("/{czatId}/name")
    public ResponseEntity<Void> updateCzatName(
            @PathVariable Long czatId,
            @RequestBody UpdateCzatNameRequest request
    ) {
        czatService.updateCzatName(czatId, request.getNazwa());
        return ResponseEntity.ok().build();
    }
    @PostMapping("/{czatId}/participants/{userLogin}")
    public ResponseEntity<Void> addParticipant(
            @PathVariable Long czatId,
            @PathVariable String userLogin
    ) {
        czatService.addParticipantByLogin(czatId, userLogin);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @DeleteMapping("/{czatId}/participants/{userLogin}")
    public ResponseEntity<Void> removeParticipant(
            @PathVariable Long czatId,
            @PathVariable Long userLogin
    ) {
        czatService.removeParticipant(czatId, userLogin);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{czatId}/to-zero/{userId}")
    public ResponseEntity<Void> setWiadomosciTo0(
            @PathVariable Long czatId,
            @PathVariable Long userId
    ) {
        czatService.setCzatUzytkownikTo0(czatId, userId);
        return ResponseEntity.noContent().build();
    }
}
