package api.szyszka.DTOs.Event;

import api.szyszka.Entities.Wydarzenie;
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
public class WydarzenieDto {
    private long id;
    private String nazwa;
    private LocalDateTime dataWyjazdu;
    private LocalDateTime dataZakonczenia;
    private String opis;
    private Long organizatorId;
    private List<UczestnictwoDto> uczestnictwa;
    private List<String> zdjecia;
    public static Wydarzenie fromCreateRequest(CreateWydarzenieRequest request) {
        Wydarzenie w = new Wydarzenie();
        w.setNazwa(request.getNazwa());
        w.setDataWyjazdu(request.getDataWyjazdu());
        w.setDataZakonczenia(request.getDataZakonczenia());
        w.setOpis(request.getOpis());
        return w;
    }

}
