package PRO.devteam.API.mysqlaccess;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.math.BigInteger;
import java.sql.Date;

@Entity(name = "Wydarzenie")
public class Event {
    public BigInteger getId() {
        return id;
    }

    public String getUzytkownikId() {
        return uzytkownikId;
    }

    public String getNazwa() {
        return nazwa;
    }

    public Date getDataWyjazdu() {
        return dataWyjazdu;
    }

    public Date getDataZakonczenia() {
        return dataZakonczenia;
    }

    public String getOpis() {
        return opis;
    }

    @Column(name = "id")
    @Id
    public BigInteger id;
    @Column(name = "UzytkownikId")
    private String uzytkownikId;
    @Column(name = "nazwa")
    private String nazwa;
    @Column(name = "dataWyjazdu")
    private Date dataWyjazdu;
    @Column(name = "datazakonczenia")
    private Date dataZakonczenia;
    @Column(name = "opis")
    private String opis;
}
