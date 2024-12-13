package PRO.devteam.API.mysqlaccess;

import jakarta.persistence.*;

import java.math.BigInteger;
import java.util.Set;

@Entity(name = "Sprawnosc")
public class Achievement {
    @Id
    @Column (name = "id")
    public BigInteger id;
    @Column (name = "nazwa")
    private String nazwa;
    @Column (name = "opis")
    private String opis;
    @Column (name = "opisWymagan")
    private String opisWymagan;

    @OneToMany(mappedBy = "achievement")
    Set<GainedAchievements> dataZdobyciaSprawnosci;

    public BigInteger getId() {
        return id;
    }

    public Set<GainedAchievements> getDataZdobyciaSprawnosci() {
        return dataZdobyciaSprawnosci;
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


}
