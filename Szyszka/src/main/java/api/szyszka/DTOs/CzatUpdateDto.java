package api.szyszka.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class CzatUpdateDto {
    private Long czat_id;
    private int nieprzeczytane_wiadomosci;
    private WiadomoscDto wiadomosc;
}
