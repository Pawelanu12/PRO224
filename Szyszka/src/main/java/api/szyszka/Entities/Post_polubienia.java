package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "post_like")
public class Post_polubienia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Uzytkownik uzytkownik;
}
