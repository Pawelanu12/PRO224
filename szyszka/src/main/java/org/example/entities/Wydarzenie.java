package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Wydarzenie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nazwa;

    @Column(name = "data_wyjazdu", nullable = false)
    private LocalDateTime dataWyjazdu;

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public void setDataWyjazdu(LocalDateTime dataWyjazdu) {
        this.dataWyjazdu = dataWyjazdu;
    }

    public void setDataZakonczenia(LocalDateTime dataZakonczenia) {
        this.dataZakonczenia = dataZakonczenia;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public void setOrganizatorId(Long organizatorId) {
        this.organizatorId = organizatorId;
    }

    public Long getId() {
        return id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public LocalDateTime getDataWyjazdu() {
        return dataWyjazdu;
    }

    public LocalDateTime getDataZakonczenia() {
        return dataZakonczenia;
    }

    public String getOpis() {
        return opis;
    }

    public Long getOrganizatorId() {
        return organizatorId;
    }

    @Column(name = "data_zakonczenia", nullable = false)
    private LocalDateTime dataZakonczenia;

    @Lob
    private String opis;

    @Column(name = "organizator_id")
    private Long organizatorId;
}
