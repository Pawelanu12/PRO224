package api.szyszka.Controllers;

import api.szyszka.DTOs.Chat.CreateWiadomoscRequest;
import api.szyszka.Repositories.CzatUzytkownikRepository;
import api.szyszka.Services.WiadomoscService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;

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
