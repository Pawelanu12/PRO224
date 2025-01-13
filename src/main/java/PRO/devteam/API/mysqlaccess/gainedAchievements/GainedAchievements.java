package PRO.devteam.API.mysqlaccess.gainedAchievements;

import jakarta.persistence.*;

import java.math.BigInteger;
import java.sql.Date;

@Entity (name = "ZdobyteSprawnosci")
public class GainedAchievements {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private BigInteger id;

    @Column(name="UzytkownikID")
    private BigInteger UzytkownikID;

    @Column(name = "SprawnoscID")
    private BigInteger SprawnoscID;

    @Column(name="dataZdobyciaSprawnosci")
    private Date dataZdobyciaSprawnosci;

    public GainedAchievements() {}
    public GainedAchievements( BigInteger uzytkownikID, BigInteger sprawnoscID, Date dataZdobyciaSprawnosci) {
        this.UzytkownikID = uzytkownikID;
        this.SprawnoscID = sprawnoscID;
        this.dataZdobyciaSprawnosci = dataZdobyciaSprawnosci;
    }

    public BigInteger getId() {
        return id;
    }

    public BigInteger getUzytkownikID() {
        return UzytkownikID;
    }

    public BigInteger getSprawnoscID() {
        return SprawnoscID;
    }

    public Date getDataZdobyciaSprawnosci() {
        return dataZdobyciaSprawnosci;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setUzytkownikID(BigInteger uzytkownikID) {
        UzytkownikID = uzytkownikID;
    }

    public void setSprawnoscID(BigInteger sprawnoscID) {
        SprawnoscID = sprawnoscID;
    }


}
