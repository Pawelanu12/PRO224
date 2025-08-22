package api.szyszka.DTOs;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UzytkownikDto {
    private Long id;
    private String imie;
    private String nazwisko;
    private String login;
    private String email;
    private String nrTelefonu;
    private String typUzytkownika;
}
