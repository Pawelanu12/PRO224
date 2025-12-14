package api.szyszka.Controllers;

import api.szyszka.DTOs.CzatDto;
import api.szyszka.DTOs.WiadomoscDto;
import api.szyszka.Entities.Czat;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wiadomosc;
import api.szyszka.Mappers.CzatMapper;
import api.szyszka.Services.CzatService;
import api.szyszka.Services.UzytkownikService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/czaty")
@RequiredArgsConstructor
public class CzatController {

    private final CzatService czatService;
    private final UzytkownikService uzytkownikService;

    @PostMapping("/private")
    public ResponseEntity<CzatDto> createPrivateChat(
            @AuthenticationPrincipal User user,
            @RequestParam("participantLogin") String participantLogin) {
        System.out.println(participantLogin);
        Uzytkownik currentUser = uzytkownikService.getUserByLogin(user.getUsername());
        Uzytkownik otherUser = uzytkownikService.getUserByLogin(participantLogin);

        CzatDto czat = czatService.createPrivateChat(currentUser, otherUser);
        return ResponseEntity.ok(czat);
    }

    @PostMapping("/group")
    public ResponseEntity<CzatDto> createGroupChat(
            @AuthenticationPrincipal User user,
            @RequestParam String nazwa,
            @RequestParam List<String> participantLogins) {

        Uzytkownik creator = uzytkownikService.getUserByLogin(user.getUsername());
        CzatDto czat = czatService.createGroupChat(nazwa, creator, participantLogins);
        return ResponseEntity.ok(czat);
    }
    @GetMapping
    public ResponseEntity<List<CzatDto>> getAllCzaty() {
        List<CzatDto> czaty = czatService.getAllCzaty()
                .stream().map(CzatMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(czaty);
    }
    @GetMapping("/my-czaty")
    public ResponseEntity<List<CzatDto>> getCzatyForCurrentUser(@AuthenticationPrincipal User user) {
        Uzytkownik u = uzytkownikService.getUserByLogin(user.getUsername());
        List<CzatDto> czaty = czatService.getCzatyForUser(u)
                .stream()
                .map(CzatMapper::toDto)
                .toList();
        return ResponseEntity.ok(czaty);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CzatDto> getCzatById(@PathVariable Long id) {
        return ResponseEntity.ok(CzatMapper.toDto(czatService.getCzatById(id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCzat(@PathVariable Long id) {
        czatService.deleteCzat(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{czatId}/participants/{uzytkownikId}")
    public ResponseEntity<Void> addParticipant(@PathVariable Long czatId,
                                               @PathVariable Long uzytkownikId) {
        Czat czat = czatService.getCzatById(czatId);
        Uzytkownik u = uzytkownikService.getUserById(uzytkownikId);
        czatService.addParticipant(czat, u);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{czatId}/participants/{uzytkownikId}")
    public ResponseEntity<Void> removeParticipant(@PathVariable Long czatId,
                                                  @PathVariable Long uzytkownikId) {
        czatService.removeParticipant(czatId, uzytkownikId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{czatId}/messages")
    public ResponseEntity<List<WiadomoscDto>> getMessages(@PathVariable Long czatId) {
        List<WiadomoscDto> msgs = czatService.getMessages(czatId)
                .stream().map(m -> new WiadomoscDto(
                        m.getId(),
                        m.getCzat().getId(),
                        m.getNadawca().getId(),
                        m.getTresc(),
                        m.getDataWyslania()
                )).collect(Collectors.toList());
        return ResponseEntity.ok(msgs);
    }

    @PostMapping("/{czatId}/messages")
    public ResponseEntity<WiadomoscDto> sendMessage(@PathVariable Long czatId,
                                                    @AuthenticationPrincipal User user,
                                                    @RequestParam String tresc) {
        Czat czat = czatService.getCzatById(czatId);
        Uzytkownik nadawca = uzytkownikService.getUserByLogin(user.getUsername());
        Wiadomosc msg = czatService.sendMessage(czat, nadawca, tresc);
        return ResponseEntity.ok(new WiadomoscDto(
                msg.getId(),
                msg.getCzat().getId(),
                msg.getNadawca().getId(),
                msg.getTresc(),
                msg.getDataWyslania()
        ));
    }
}
