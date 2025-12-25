package api.szyszka.Controllers;

import api.szyszka.DTOs.ChatMessage;
import api.szyszka.DTOs.CreateWiadomoscRequest;
import api.szyszka.DTOs.WiadomoscDto;
import api.szyszka.Mappers.WiadomoscMapper;
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
        @MessageMapping("/chat.send/{id}")
        @SendTo("/topic/public/{id}")
        public void  sendMessage(@DestinationVariable Long id,
                                        CreateWiadomoscRequest message
                                      ) {
            WiadomoscDto dto= WiadomoscMapper
                    .toDto(wiadomoscService.createWiadomosc(message));
            
            messagingTemplate.convertAndSend(
                    "/topic/public/" + id,
                    dto
            );
        }
//test
}
