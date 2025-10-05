package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"uzytkownik_id", "sprawnosc_id"})})
public class ZdobyteSprawnosci {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataZdobyciaSprawnosci;

    @ManyToOne
    @JoinColumn(name = "uzytkownik_id", nullable = false)
    private Uzytkownik uzytkownik;

    @ManyToOne
    @JoinColumn(name = "sprawnosc_id", nullable = false)
    private Sprawnosc sprawnosc;
}

