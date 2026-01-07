package api.szyszka.DTOs.Chat;

import java.time.LocalDateTime;
import java.util.List;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CzatSummaryDto {

    private Long id;
    private String nazwa;
    private boolean czyGrupowy;
    private LocalDateTime dataUtworzenia;
    private List<String> uczestnicyLogins;
    private Integer nieprzeczytaneWiadomosci;
    private WiadomoscDto lastReadMessage;
}
