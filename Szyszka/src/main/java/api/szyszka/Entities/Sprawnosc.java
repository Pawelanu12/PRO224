package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Sprawnosc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nazwa;

    @Column(columnDefinition = "TEXT")
    private String opis;

    @Column(columnDefinition = "TEXT")
    private String opisWymagan;

    private String ikona;
}
