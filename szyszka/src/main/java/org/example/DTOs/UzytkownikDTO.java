package org.example.DTOs;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UzytkownikDTO {

    private Long id;

    private String imie;

    private String nazwisko;

    private String login;

    private String email;

    private LocalDateTime dataUrodzenia;

    private String nrTelefonu;

    private String typUzytkownika;
}
