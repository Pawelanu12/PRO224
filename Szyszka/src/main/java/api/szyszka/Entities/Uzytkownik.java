package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Uzytkownik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imie;
    private String nazwisko;

    @Column(unique = true, nullable = false)
    private String login;

    private String haslo;
    private String email;
    private LocalDateTime dataUrodzenia;
    private String nrTelefonu;
    private LocalDateTime dataDolaczeniaDoGromady;

    @ManyToOne
    @JoinColumn(name = "rodzic_id1")
    private Uzytkownik rodzic1;

    @ManyToOne
    @JoinColumn(name = "rodzic_id2")
    private Uzytkownik rodzic2;

    private String typUzytkownika;

    @ManyToOne
    @JoinColumn(name = "szostka_id")
    private Szostka szostka;

    @OneToMany(mappedBy = "uzytkownik")
    private List<Skladka> skladki;

    @OneToMany(mappedBy = "uzytkownik")
    private List<ZdobyteSprawnosci> zdobyteSprawnosci;

    @OneToMany(mappedBy = "organizator")
    private List<Wydarzenie> wydarzenia;

    @OneToMany(mappedBy = "autor")
    private List<Post> posty;

    @OneToMany(mappedBy = "autor")
    private List<Komentarz> komentarze;

    @OneToMany(mappedBy = "uzytkownik")
    private List<Zdjecie> zdjecia;

    @OneToMany(mappedBy = "uzytkownik")
    private List<Uczestnictwo> uczestnictwa;
}