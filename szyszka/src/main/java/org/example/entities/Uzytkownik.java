package org.example.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "typ_uzytkownika", discriminatorType = DiscriminatorType.STRING)
@Data
public abstract class Uzytkownik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String imie;

    @NotNull
    private String nazwisko;

    @NotNull
    @Column(unique = true)
    @Email
    private String email;

    @NotNull
    private String haslo;

    @Column(name = "typ_uzytkownika", insertable = false, updatable = false)
    private String typUzytkownika; // Wartość rozpoznawana przez @DiscriminatorValue w klasach pochodnych
}
