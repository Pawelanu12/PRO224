package api.szyszka.DTOs.Szostka;

import api.szyszka.DTOs.User.UzytkownikDto;
import api.szyszka.Entities.Szostka;
import api.szyszka.Entities.Uzytkownik;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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

public class SzostkaDto {
    private Long id;
    private String nazwa;
    private LocalDateTime dataStworzenia;
    private List<UzytkownikDto> uzytkownicy;
}
