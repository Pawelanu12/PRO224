package api.szyszka.DTOs.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMyProfileRequest {
    private String imie;
    private String nazwisko;
    private String login;
    private String email;
    private String nrTelefonu;
    private LocalDate dataUrodzenia;
}
