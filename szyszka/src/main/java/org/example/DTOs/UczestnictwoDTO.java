package org.example.DTOs;

import java.time.LocalDateTime;

public class UczestnictwoDTO {
    private Long id;
    private Long uzytkownikId; // Tylko ID użytkownika
    private Long wydarzenieId; // Tylko ID wydarzenia
    private LocalDateTime dataZakonczenia;
    private boolean obecny;

    // Gettery i settery
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUzytkownikId() {
        return uzytkownikId;
    }

    public void setUzytkownikId(Long uzytkownikId) {
        this.uzytkownikId = uzytkownikId;
    }

    public Long getWydarzenieId() {
        return wydarzenieId;
    }

    public void setWydarzenieId(Long wydarzenieId) {
        this.wydarzenieId = wydarzenieId;
    }

    public LocalDateTime getDataZakonczenia() {
        return dataZakonczenia;
    }

    public void setDataZakonczenia(LocalDateTime dataZakonczenia) {
        this.dataZakonczenia = dataZakonczenia;
    }

    public boolean isObecny() {
        return obecny;
    }

    public void setObecny(boolean obecny) {
        this.obecny = obecny;
    }
}
