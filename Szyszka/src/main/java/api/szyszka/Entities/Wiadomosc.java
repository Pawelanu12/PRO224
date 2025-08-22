package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Wiadomosc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "czat_id", nullable = false)
    private Czat czat;

    @ManyToOne
    @JoinColumn(name = "nadawca_id", nullable = false)
    private Uzytkownik nadawca;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String tresc;

    private LocalDateTime dataWyslania = LocalDateTime.now();
}
