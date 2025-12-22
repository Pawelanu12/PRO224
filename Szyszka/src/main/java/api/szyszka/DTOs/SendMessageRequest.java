package api.szyszka.DTOs;

import lombok.Data;

@Data
public class SendMessageRequest {
    private Long czatId;
    private Long nadawcaId;
    private String tresc;
}
