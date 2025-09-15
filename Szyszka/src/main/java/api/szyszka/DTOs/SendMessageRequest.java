package api.szyszka.DTOs;

import lombok.Data;

@Data
public class SendMessageRequest {
    private Long nadawcaId;
    private String tresc;
}
