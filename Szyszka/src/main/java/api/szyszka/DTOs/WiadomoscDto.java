package api.szyszka.DTOs;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class WiadomoscDto {
    private Long id;
    private Long nadawcaId;
    private String tresc;
    private LocalDateTime dataWyslania;
}
