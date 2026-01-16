package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "event")
public class Wydarzenie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nazwa;

    private LocalDateTime dataWyjazdu;

    private LocalDateTime dataZakonczenia;

    @Column(columnDefinition = "TEXT")
    private String opis;


    @Enumerated(EnumType.STRING)
    @Column(name = "typ_wydarzenia", nullable = false)
    private TypWydarzenia typ;

    @ManyToOne
    @JoinColumn(name = "organizator_id")
    private Uzytkownik organizator;

    @OneToMany(mappedBy = "wydarzenie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WydarzenieZdjecie> zdjecia;

    @OneToMany(mappedBy = "wydarzenie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Uczestnictwo> uczestnictwa;
}
