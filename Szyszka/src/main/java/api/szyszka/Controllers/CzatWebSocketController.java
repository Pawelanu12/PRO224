package api.szyszka.Controllers;

import api.szyszka.DTOs.*;
import api.szyszka.Entities.Czat;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Mappers.CzatMapper;
import api.szyszka.Services.CzatService;
import api.szyszka.Repositories.UzytkownikRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class    CzatWebSocketController {

    private final CzatService czatService;
    private final UzytkownikRepository uzytkownikRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/czat.private.create")
    public void createPrivateChat(CreatePrivateChatRequest request) {

        Uzytkownik user1 = uzytkownikRepository.findById(request.getUser1Id()).orElse(null);
        Uzytkownik user2 = uzytkownikRepository.findById(request.getUser2Id()).orElse(null);

        if (user1 == null || user2 == null) {
            String msg = "Niepoprawny login użytkownika: " +
                    (user1 == null ? request.getUser1Id() : "") +
                    (user2 == null ? request.getUser2Id() : "");
            messagingTemplate.convertAndSend("/topic/errors", msg);
            return;
        }

        CzatDto czatDto = czatService.createPrivateChat(user1, user2);

        messagingTemplate.convertAndSend("/topic/czaty/" + user1.getId(), czatDto);
        messagingTemplate.convertAndSend("/topic/czaty/" + user2.getId(), czatDto);
    }

    @MessageMapping("/czat.group.create")
    public void createGroupChat(CreateGroupChatRequest request) {

        Uzytkownik creator = uzytkownikRepository.findById(request.getCreatorId()).orElse(null);
        if (creator == null) {
            messagingTemplate.convertAndSend("/topic/errors", "Niepoprawny login twórcy: " + request.getCreatorId());
            return;
        }

        // Filtruje tylko istniejących użytkowników
        List<String> validLogins = request.getParticipantLogins().stream()
                .filter(login -> uzytkownikRepository.findByLogin(login).isPresent())
                .collect(Collectors.toList());

        if (validLogins.isEmpty()) {
            messagingTemplate.convertAndSend("/topic/errors", "Brak poprawnych uczestników dla czatu grupowego");
            return;
        }

        CzatDto czatDto = czatService.createGroupChat(request.getNazwa(), creator, validLogins);

        for (Long userId : czatDto.getUczestnicyIds()) {
            messagingTemplate.convertAndSend("/topic/czaty/" + userId, czatDto);
        }
    }

    @MessageMapping("/czat.list")
    public void getUserChats(Long userId) {

        Uzytkownik user = uzytkownikRepository.findById(userId).orElse(null);
        if (user == null) {
            messagingTemplate.convertAndSend("/topic/errors", "Niepoprawny ID użytkownika: " + userId);
            return;
        }

        List<Czat> czaty = czatService.getCzatyForUser(user);

        List<CzatSummaryDto> summary = czaty.stream()
                .map(CzatMapper::toSummaryDto)
                .collect(Collectors.toList());

        messagingTemplate.convertAndSend("/topic/czaty/" + userId, summary);
    }
}
