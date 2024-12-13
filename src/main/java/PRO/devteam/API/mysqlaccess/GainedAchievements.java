package PRO.devteam.API.mysqlaccess;

import jakarta.persistence.*;

import java.math.BigInteger;
import java.sql.Date;

@Entity (name = "ZdobyteSprawnosci")
public class GainedAchievements {
    public GainedAchievements(BigInteger id, User user, Achievement achievement, Date dataZdobyciaSprawnosci) {
        this.id = id;
        this.user = user;
        this.achievement = achievement;
        this.dataZdobyciaSprawnosci = dataZdobyciaSprawnosci;
    }

    @Id
    public BigInteger id;
    @ManyToOne
    @JoinColumn(name = "UzytkownikID")
    User user;

    @ManyToOne
    @JoinColumn(name = "SprawnoscID")
    Achievement achievement;

    Date dataZdobyciaSprawnosci;

    public BigInteger getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Achievement getAchievement() {
        return achievement;
    }

    public Date getDataZdobyciaSprawnosci() {
        return dataZdobyciaSprawnosci;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAchievement(Achievement achievement) {
        this.achievement = achievement;
    }

    public void setDataZdobyciaSprawnosci(Date dataZdobyciaSprawnosci) {
        this.dataZdobyciaSprawnosci = dataZdobyciaSprawnosci;
    }
}
