package api.szyszka.DTOs.Chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CzatUpdateDto {
    private Long czatId;
    private int nieprzeczytaneWiadomosci;
    private WiadomoscDto wiadomosc;
}
