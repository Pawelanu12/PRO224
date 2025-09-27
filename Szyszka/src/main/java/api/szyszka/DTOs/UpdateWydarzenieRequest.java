package api.szyszka.DTOs;

import api.szyszka.Entities.Uczestnictwo;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Zdjecie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateWydarzenieRequest {
    private String nazwa;
    private LocalDateTime dataWyjazdu;
    private LocalDateTime dataZakonczenia;
    private String opis;
    private Uzytkownik organizator;
    private List<Uczestnictwo> uczestnictwa;
    private List<Zdjecie> zdjecia;

}
