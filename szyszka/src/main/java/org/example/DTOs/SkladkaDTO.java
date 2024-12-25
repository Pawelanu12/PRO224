package org.example.DTOs;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SkladkaDTO {
    private Long id;
    private String nazwa;
    private LocalDateTime dataWplaty;
    private float kwota;
    private Long uzytkownikId; // Mapowanie na ID użytkownika zamiast całego obiektu
}
