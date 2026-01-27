package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "event_image")
public class WydarzenieZdjecie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sciezka;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Wydarzenie wydarzenie;
}
