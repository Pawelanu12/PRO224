package api.szyszka.DTOs;

import api.szyszka.Entities.Czat;
import api.szyszka.Entities.Uzytkownik;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateWiadomoscRequest {
    private Long id;
    private Czat czat;
    private Uzytkownik nadawca;
    private String tresc;
    private LocalDateTime dataWyslania;
}
