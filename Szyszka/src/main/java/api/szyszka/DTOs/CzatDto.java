package api.szyszka.DTOs;

import api.szyszka.Entities.CzatUzytkownik;
import api.szyszka.Entities.Wiadomosc;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CzatDto {
    private Long id;
    private String nazwa;
    private boolean czyGrupowy;
    private LocalDateTime dataUtworzenia;
    private List<CzatUzytkownik> uczestnicyIds;
    private List<Wiadomosc> Wiadomosci;
}
