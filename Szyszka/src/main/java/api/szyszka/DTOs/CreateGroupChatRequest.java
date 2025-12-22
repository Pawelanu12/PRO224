package api.szyszka.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateGroupChatRequest {

    private String nazwa;
    private Long creatorId;
    private List<String> participantLogins;
}
