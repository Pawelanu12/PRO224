package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
public class Szostka {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nazwa;

    private LocalDateTime dataStworzenia;

    @OneToMany(mappedBy = "szostka")
    private List<Uzytkownik> uzytkownicy;
}
