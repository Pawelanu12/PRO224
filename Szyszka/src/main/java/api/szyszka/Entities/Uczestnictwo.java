package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "event_participation")
public class Uczestnictwo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean obecny;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Uzytkownik uzytkownik;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Wydarzenie wydarzenie;
}
