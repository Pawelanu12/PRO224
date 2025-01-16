package PRO.devteam.API.mysqlaccess.gainedAchievements;

import PRO.devteam.API.mysqlaccess.achievement.Achievement;
import PRO.devteam.API.mysqlaccess.user.User;
import jakarta.persistence.*;

import java.math.BigInteger;
import java.util.Date;

@Entity (name = "ZdobyteSprawnosci")
public class GainedAchievements {
    @Id
    @Column(name = "id", columnDefinition = "BIGINT")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private BigInteger id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "uzytkownikid", columnDefinition = "BIGINT")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "sprawnoscid", columnDefinition = "BIGINT")
    private Achievement achievement;

    @Column(name="dataZdobyciaSprawnosci")
    private Date dataZdobyciaSprawnosci;

    public GainedAchievements() {}
    public GainedAchievements( User user, Achievement achievement, Date dataZdobyciaSprawnosci) {
        this.user = user;
        this.achievement = achievement;
        this.dataZdobyciaSprawnosci = dataZdobyciaSprawnosci;
    }

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
