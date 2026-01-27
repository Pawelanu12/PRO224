package api.szyszka.DTOs.User;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateUzytkownikRequest {
    private String imie;
    private String nazwisko;
    private String login;
    private String haslo;
    private String email;
    private String nrTelefonu;
    private String typUzytkownika;
}
