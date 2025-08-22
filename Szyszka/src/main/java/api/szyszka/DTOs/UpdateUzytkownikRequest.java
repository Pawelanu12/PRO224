package api.szyszka.DTOs;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUzytkownikRequest {
    private String imie;
    private String nazwisko;
    private String email;
    private String nrTelefonu;
    private String typUzytkownika;
}
