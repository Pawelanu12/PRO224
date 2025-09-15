package api.szyszka.DTOs;

import api.szyszka.Entities.Szostka;
import api.szyszka.Entities.Uzytkownik;
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
public class UpdateSzostkaRequest {
    private String nazwa;
    private LocalDateTime dataStworzenia;
    private List<Uzytkownik> uzytkonicy;
}
