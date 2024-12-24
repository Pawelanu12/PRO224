package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Uczestnictwo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "uzytkownik_id", nullable = false)
    private Uzytkownik uzytkownik;

    @ManyToOne
    @JoinColumn(name = "wydarzenie_id", nullable = false)
    private Wydarzenie wydarzenie;

    @Column(name = "data_zakonczenia")
    private LocalDateTime dataZakonczenia;

    @Column(nullable = false)
    private boolean obecny;
}
