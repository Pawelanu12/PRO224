package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Sprawnosc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public Long getId() {
        return id;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public void setOpisWymagan(String opisWymagan) {
        this.opisWymagan = opisWymagan;
    }

    public String getNazwa() {
        return nazwa;
    }

    public String getOpis() {
        return opis;
    }

    public String getOpisWymagan() {
        return opisWymagan;
    }

    @Column(nullable = false)
    private String nazwa;

    @Lob
    private String opis;

    @Lob
    @Column(name = "opis_wymagan")
    private String opisWymagan;
}
