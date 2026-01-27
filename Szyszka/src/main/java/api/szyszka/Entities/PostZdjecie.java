package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "post_image")
public class PostZdjecie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sciezka;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

}
