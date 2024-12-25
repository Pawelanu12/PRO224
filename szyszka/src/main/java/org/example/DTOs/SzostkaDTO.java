package org.example.DTOs;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class SzostkaDTO {
    private Long id;
    private String nazwa;
    private LocalDateTime dataStworzenia;

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

    public LocalDateTime getDataStworzenia() {
        return dataStworzenia;
    }

    public void setDataStworzenia(LocalDateTime dataStworzenia) {
        this.dataStworzenia = dataStworzenia;
    }
}
