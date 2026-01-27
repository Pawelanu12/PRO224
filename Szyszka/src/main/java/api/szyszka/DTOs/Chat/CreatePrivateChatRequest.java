package api.szyszka.DTOs.Chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePrivateChatRequest {

    private String user1Login;
    private String user2Login;
}
