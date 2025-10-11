package api.szyszka.DTOs;

import api.szyszka.Entities.Sprawnosc;
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
public class UpdateZdobytaSprawnoscRequest {
    private LocalDateTime dataZdobyciaSprawnosci;
    private Uzytkownik uzytkownik;
    private Sprawnosc sprawnosc;
}
