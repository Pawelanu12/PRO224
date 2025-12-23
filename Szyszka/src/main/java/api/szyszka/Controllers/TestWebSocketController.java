package api.szyszka.Controllers;

import api.szyszka.DTOs.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TestWebSocketController {

        @MessageMapping("/chat.send")
        @SendTo("/topic/public")
        public ChatMessage sendMessage(ChatMessage message) {
            return message;
        }

}
