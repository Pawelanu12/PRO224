package api.szyszka.Controllers;

import api.szyszka.DTOs.ChatMessage;
import api.szyszka.DTOs.CreateWiadomoscRequest;
import api.szyszka.DTOs.CzatUpdateDto;
import api.szyszka.DTOs.WiadomoscDto;
import api.szyszka.Entities.Czat;
import api.szyszka.Entities.CzatUzytkownik;
import api.szyszka.Entities.Wiadomosc;
import api.szyszka.Mappers.WiadomoscMapper;
import api.szyszka.Repositories.CzatUzytkownikRepository;
import api.szyszka.Services.WiadomoscService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.security.Principal;

@RequiredArgsConstructor
@Controller
public class TestWebSocketController {
       private final WiadomoscService wiadomoscService;
        private final SimpMessagingTemplate messagingTemplate;
    private final CzatUzytkownikRepository czatUzytkownikRepository;

    @MessageMapping("/chat.send/{id}")
        public void  sendMessage(@DestinationVariable Long id,
                                        CreateWiadomoscRequest message
//                                 Principal principal
                                      ) {
//        System.out.println(principal.getName());
            wiadomoscService.createWiadomosc(message);
        }
//test
}
