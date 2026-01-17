package api.szyszka.DTOs.User;

import api.szyszka.Entities.TypUzytkownika;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private Long rodzicId1;
    private Long rodzicId2;
    private String typUzytkownika;
    private LocalDate dataUrodzenia;
    private LocalDateTime dataDolaczenia;
    private String nazwaSzostki;
}
