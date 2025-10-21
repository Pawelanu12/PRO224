package api.szyszka.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CreateZdobytaSprawnoscRequest {
    private LocalDateTime dataZdobyciaSprawnosci;
    private Long uzytkownikId;
    private Long sprawnoscId;
}
