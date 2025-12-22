package api.szyszka.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateWiadomoscRequest {

    private Long wiadomoscId;   // ID wiadomości do edycji
    private String tresc;
    private LocalDateTime dataWyslania;
}
