package org.example.DTOs;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class WydarzenieDTO {
    private Long id;
    private String nazwa;
    private LocalDateTime dataWyjazdu;
    private LocalDateTime dataZakonczenia;
    private String opis;
    private Long organizatorId; // Tylko ID organizatora

    // Gettery i settery
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public LocalDateTime getDataWyjazdu() {
        return dataWyjazdu;
    }

    public void setDataWyjazdu(LocalDateTime dataWyjazdu) {
        this.dataWyjazdu = dataWyjazdu;
    }

    public LocalDateTime getDataZakonczenia() {
        return dataZakonczenia;
    }

    public void setDataZakonczenia(LocalDateTime dataZakonczenia) {
        this.dataZakonczenia = dataZakonczenia;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Long getOrganizatorId() {
        return organizatorId;
    }

    public void setOrganizatorId(Long organizatorId) {
        this.organizatorId = organizatorId;
    }
}
