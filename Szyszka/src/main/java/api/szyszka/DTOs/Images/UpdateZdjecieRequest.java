package api.szyszka.DTOs.Images;

import api.szyszka.Entities.Post;
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
public class UpdateZdjecieRequest {
    private Long id;
    private String sciezka;
    private Post post;
    private Wydarzenie wydarzenie;
    private Uzytkownik uzytkownik;
}
