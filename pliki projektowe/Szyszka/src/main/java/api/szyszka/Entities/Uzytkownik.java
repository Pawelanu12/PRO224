package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "user")
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
    private LocalDate dataUrodzenia;
    private String nrTelefonu;
    private LocalDateTime dataDolaczeniaDoGromady;
    private String zdjecie;
    @ManyToOne
    @JoinColumn(name = "rodzic_id1")
    private Uzytkownik rodzic1;

    @ManyToOne
    @JoinColumn(name = "rodzic_id2")
    private Uzytkownik rodzic2;

    @Enumerated(EnumType.STRING)
    @Column(name = "typ_uzytkownika", nullable = false)
    private TypUzytkownika typUzytkownika = TypUzytkownika.DEFAULT;


    @ManyToOne
    @JoinColumn(name = "squad_id")
    private Szostka szostka;

    @Column(unique = true)
    private String googleId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider authProvider = AuthProvider.LOCAL;

    @OneToMany(mappedBy = "uzytkownik")
    private List<ZdobytaSprawnosc> zdobyteSprawnosci;

    @OneToMany(mappedBy = "organizator")
    private List<Wydarzenie> wydarzenia;

    @OneToMany(mappedBy = "autor")
    private List<Post> posty;

    @OneToMany(mappedBy = "autor")
    private List<Komentarz> komentarze;

    @OneToMany(mappedBy = "uzytkownik")
    private List<Uczestnictwo> uczestnictwa;
}