package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chat")
public class Czat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nazwa;
    private boolean czyGrupowy;

    private LocalDateTime dataUtworzenia = LocalDateTime.now();

    @OneToMany(mappedBy = "czat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CzatUzytkownik> uczestnicy = new ArrayList<>();

    @OneToMany(mappedBy = "czat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wiadomosc> wiadomosci = new ArrayList<>();
}
