package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataStworzenia;

    @Column(columnDefinition = "TEXT")
    private String tresc;

    private int iloscPolubien;

    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private Uzytkownik autor;

    @OneToMany(mappedBy = "post")
    private List<Komentarz> komentarze;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostZdjecie> zdjecia;

    //@ElementCollection
    //@CollectionTable(name = "post_zdjecia", joinColumns = @JoinColumn(name = "post_id"))
    //@Column(name = "sciezka")
    //private List<String> zdjecia = new ArrayList<>();

    //@OneToMany(mappedBy = "post")
    //private List<Zdjecie> zdjecia;

}

