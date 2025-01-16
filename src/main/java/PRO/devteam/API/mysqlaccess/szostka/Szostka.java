package PRO.devteam.API.mysqlaccess.szostka;

import jakarta.persistence.*;

import java.math.BigInteger;
import java.sql.Date;

@Entity(name = "Szostka")
public class Szostka {
    @Id
    @Column(name = "id", columnDefinition = "BIGINT")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)

    private BigInteger id;

    @Column(name = "nazwa")
    private String nazwa;

    @Column(name = "dataStworzenia")
    private Date dataStworzenia;

    public Szostka() {}

    public Szostka(String nazwa, Date dataStworzenia) {
        this.nazwa = nazwa;
        this.dataStworzenia = dataStworzenia;
    }

    public BigInteger getId() {
        return id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public Date getDataStworzenia() {
        return dataStworzenia;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public void setDataStworzenia(Date dataStworzenia) {
        this.dataStworzenia = dataStworzenia;
    }
}
