package api.szyszka.DTOs.Post;

import api.szyszka.Entities.Komentarz;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Entities.Zdjecie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePostRequest {
    private LocalDateTime dataStworzenia;
    private String tresc;
//    private List<Long> polubenia;
    private Long autorId;
    private List<String> zdjecia=  new ArrayList<>();;
    //private List<Komentarz> komentarze;
    //private List<Zdjecie> zdjecia;
}
