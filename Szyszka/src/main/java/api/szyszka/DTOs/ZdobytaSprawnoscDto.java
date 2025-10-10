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
public class ZdobytaSprawnoscDto {
    private long id;
    private LocalDateTime dataZdobyciaSprawnosci;
    private Long uzytkownikId;
    private Long sprawnoscId;
}
