package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class ZdobyteSprawnosci {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "uzytkownik_id", nullable = false)
    private Zuch uzytkownik; // Powiązanie z encją Zuch

    @ManyToOne
    @JoinColumn(name = "sprawnosc_id", nullable = false)
    private Sprawnosc sprawnosc;

    @Column(name = "data_zdobycia_sprawnosci", nullable = false)
    private LocalDateTime dataZdobyciaSprawnosci;
}
