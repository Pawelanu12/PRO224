package api.szyszka.DTOs;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Data
public class CzatDto {
    private Long id;
    private String nazwa;
    private boolean czyGrupowy;
    private LocalDateTime dataUtworzenia;
    private List<Long> uczestnicyIds;
    private List<WiadomoscDto> wiadomosci;
}
