package api.szyszka.DTOs;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CzatDto {
    private Long id;
    private String nazwa;
    private boolean czyGrupowy;
    private LocalDateTime dataUtworzenia;
    private List<Long> uczestnicyIds;
}
