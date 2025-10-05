package api.szyszka.DTOs;

import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Wydarzenie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UczestnictwoDto {
    private Long id;
    private boolean uczestnik;
    private Long uzytkownikId;
    private Long wydarzenieId;
}
