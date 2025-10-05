package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Wydarzenie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nazwa;
    private LocalDateTime dataWyjazdu;
    private LocalDateTime dataZakonczenia;

    @Column(columnDefinition = "TEXT")
    private String opis;

    @ManyToOne
    @JoinColumn(name = "organizator_id")
    private Uzytkownik organizator;

    @OneToMany(mappedBy = "wydarzenie")
    private List<Uczestnictwo> uczestnictwa;

    @OneToMany(mappedBy = "wydarzenie")
    private List<Zdjecie> zdjecia;
}
