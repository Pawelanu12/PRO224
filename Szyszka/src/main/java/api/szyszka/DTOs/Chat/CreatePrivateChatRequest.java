package api.szyszka.DTOs.Chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePrivateChatRequest {

    private Long user1Id;
    private Long user2Id;
}
