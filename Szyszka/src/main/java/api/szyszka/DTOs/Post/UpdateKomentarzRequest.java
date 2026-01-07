package api.szyszka.DTOs.Post;

import api.szyszka.Entities.Post;
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
public class UpdateKomentarzRequest {
    private LocalDateTime dataStworzenia;
    private String tresc;
    private Post post;
    private Uzytkownik uzytkownik;
}
