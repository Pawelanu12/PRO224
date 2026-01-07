package api.szyszka.DTOs.Images;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CreateZdjecieRequest {
    private String sciezka;
    private Long postId;
    private Long wydarzenieId;
    private Long uzytkownikId;
}
