package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "badge")
public class Sprawnosc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nazwa;

    private String opis;

    private String opisWymagan;


    private String ikona;
}
