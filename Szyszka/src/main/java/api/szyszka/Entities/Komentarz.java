package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "comment")
public class Komentarz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataStworzenia;

    @Column(columnDefinition = "TEXT")
    private String tresc;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private Uzytkownik autor;
}
