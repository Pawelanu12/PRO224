package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Wydarzenie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nazwa;

    @Column(name = "data_wyjazdu", nullable = false)
    private LocalDateTime dataWyjazdu;

    @Column(name = "data_zakonczenia", nullable = false)
    private LocalDateTime dataZakonczenia;

    @Lob
    private String opis;

    @ManyToOne
    @JoinColumn(name = "organizator_id")
    private Uzytkownik organizator; // Organizator wydarzenia
}
