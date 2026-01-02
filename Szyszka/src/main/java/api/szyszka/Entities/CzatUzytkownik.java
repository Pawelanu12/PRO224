package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CzatUzytkownik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "czat_id", nullable = false)
    private Czat czat;

    @ManyToOne
    @JoinColumn(name = "uzytkownik_id", nullable = false)
    private Uzytkownik uzytkownik;

    @Column(name = "nieprzeczytane_wiadomosci", nullable = false)
    private Integer nieprzeczytaneWiadomosci = 0;

    @ManyToOne
    @JoinColumn(name = "last_read_message_id")
    private Wiadomosc lastReadMessage;
}
