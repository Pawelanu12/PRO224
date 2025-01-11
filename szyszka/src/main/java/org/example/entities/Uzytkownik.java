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

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getImie() {
        return imie;
    }

    public void setHaslo(String haslo) {
        this.haslo = haslo;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDataUrodzenia(LocalDateTime dataUrodzenia) {
        this.dataUrodzenia = dataUrodzenia;
    }

    public void setNrTelefonu(String nrTelefonu) {
        this.nrTelefonu = nrTelefonu;
    }

    public void setTypUzytkownika(String typUzytkownika) {
        this.typUzytkownika = typUzytkownika;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public String getLogin() {
        return login;
    }

    public String getHaslo() {
        return haslo;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getDataUrodzenia() {
        return dataUrodzenia;
    }

    public String getNrTelefonu() {
        return nrTelefonu;
    }

    public String getTypUzytkownika() {
        return typUzytkownika;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
