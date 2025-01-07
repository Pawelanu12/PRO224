package org.example.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "typ_uzytkownika", discriminatorType = DiscriminatorType.STRING)
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public abstract class Uzytkownik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull
    private String imie;

    @NotNull
    private String nazwisko;

    @NotNull
    @Column(unique = true)
    private String login;

    @NotNull
    private String haslo;

    @Email
    private String email;

    @Column(name = "data_urodzenia")
    private LocalDateTime dataUrodzenia;

    @Column(name = "nr_telefonu")
    private String nrTelefonu;


    @Column(name = "typ_uzytkownika", insertable = false, updatable = false)
    private String typUzytkownika; // Pole dyskryminujące dla dziedziczenia
}
