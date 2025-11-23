package api.szyszka.DTOs;

import api.szyszka.Entities.Uczestnictwo;
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
public class CreateWydarzenieRequest {
    private String nazwa;
    private LocalDateTime dataWyjazdu;
    private LocalDateTime dataZakonczenia;
    private String opis;
    private Long organizatorId;
    private List<String> zdjecia;
}
