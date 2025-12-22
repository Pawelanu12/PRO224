package api.szyszka.DTOs;

import java.time.LocalDateTime;
import java.util.List;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CzatSummaryDto {

    private Long id;
    private String nazwa;
    private boolean czyGrupowy;
    private LocalDateTime dataUtworzenia;
    private List<Long> uczestnicyIds;
}
