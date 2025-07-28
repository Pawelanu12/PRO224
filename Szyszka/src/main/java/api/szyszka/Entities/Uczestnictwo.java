package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Uczestnictwo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean obecny;

    @ManyToOne
    @JoinColumn(name = "uzytkownik_id", nullable = false)
    private Uzytkownik uzytkownik;

    @ManyToOne
    @JoinColumn(name = "wydarzenie_id", nullable = false)
    private Wydarzenie wydarzenie;
}
