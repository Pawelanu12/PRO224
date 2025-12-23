package api.szyszka.DTOs;

import api.szyszka.Entities.Komentarz;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Zdjecie;
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
public class UpdatePostRequest {
    private Long id;
    private LocalDateTime dataStworzenia;
    private String tresc;
    private Uzytkownik autor;
    private List<String> zdjecia;
    //private List<Komentarz> komentarze;
    //private List<Zdjecie> zdjecia;
}
