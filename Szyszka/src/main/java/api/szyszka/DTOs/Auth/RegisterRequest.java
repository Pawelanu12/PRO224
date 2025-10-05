package api.szyszka.DTOs.Auth;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RegisterRequest {
    private String login;
    private String haslo;
    private String imie;
    private String nazwisko;
    private String typUzytkownika;
    private String email;
    private LocalDateTime dataUrodzenia;
    private String nrTelefonu;
}


