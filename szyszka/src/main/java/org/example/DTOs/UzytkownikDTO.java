package org.example.DTOs;

import lombok.Data;

@Data
public class UzytkownikDTO {
    private Long id;
    private String imie;
    private String nazwisko;
    private String email;
    private String typUzytkownika;

    public void setId(Long id) {
        this.id = id;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTypUzytkownika(String typUzytkownika) {
        this.typUzytkownika = typUzytkownika;
    }

    public Long getId() {
        return id;
    }

    public String getImie() {
        return imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public String getEmail() {
        return email;
    }

    public String getTypUzytkownika() {
        return typUzytkownika;
    }
}
