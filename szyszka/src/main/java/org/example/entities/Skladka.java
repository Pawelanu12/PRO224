package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Skladka {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nazwa;

    @Column(name = "data_wplaty", nullable = false)
    private LocalDateTime dataWplaty;

    @Column(nullable = false)
    private float kwota;

    @ManyToOne
    @JoinColumn(name = "uzytkownik_id", nullable = false)
    private Uzytkownik uzytkownik;
}
