package org.example.DTOs;

import lombok.Data;

@Data
public class UzytkownikDTO {
    private Long id;
    private String imie;
    private String nazwisko;
    private String email;
    private TypUzytkownikaDTO typUzytkownika;
}
