package api.szyszka.DTOs.Chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateGroupChatRequest {
    private String nazwa;
    private String creatorLogin;
    private List<String> participantLogins;
}
