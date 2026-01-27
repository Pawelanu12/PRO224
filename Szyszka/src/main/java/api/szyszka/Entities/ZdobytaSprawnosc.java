package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(
        name = "user_badge",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"uzytkownik_id", "sprawnosc_id"})}
)
public class ZdobytaSprawnosc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataZdobyciaSprawnosci;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Uzytkownik uzytkownik;

    @ManyToOne
    @JoinColumn(name = "badge_id", nullable = false)
    private Sprawnosc sprawnosc;
}

