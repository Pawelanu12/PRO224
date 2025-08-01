package PRO.devteam.API.mysqlaccess.achievement;


import jakarta.persistence.*;

import java.math.BigInteger;

@Entity(name = "sprawnosc")
public class Achievement {
    @Id
    @Column (name = "id", columnDefinition = "BIGINT")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger id;
    @Column (name = "nazwa")
    private String nazwa;
    @Column (name = "opis")
    private String opis;
    @Column (name = "opisWymagan")
    private String opisWymagan;


    public Achievement() {}

    public Achievement(String nazwa, String opis, String opisWymagan) {
        this.nazwa = nazwa;
        this.opis = opis;
        this.opisWymagan = opisWymagan;
    }

    public BigInteger getId() {
        return id;
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

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public void setOpisWymagan(String opisWymagan) {
        this.opisWymagan = opisWymagan;
    }
}
