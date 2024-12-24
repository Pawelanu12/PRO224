package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TypUzytkownika {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nazwa;

    @Lob
    private String opis;
}
