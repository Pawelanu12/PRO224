package PRO.devteam.API.mysqlaccess;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Objects;

@Embeddable
public class GainedAchievementsKey implements Serializable {
    @Column (name = "UzytkownikID")
    private BigInteger userId;
    @Column (name = "SprawnoscID")
    private BigInteger achievementId;

    public GainedAchievementsKey(BigInteger userId, BigInteger achievementId) {
        this.userId = userId;
        this.achievementId = achievementId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GainedAchievementsKey that = (GainedAchievementsKey) o;
        return Objects.equals(userId, that.userId) && Objects.equals(achievementId, that.achievementId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, achievementId);
    }

    public BigInteger getUserId() {
        return userId;
    }

    public BigInteger getAchievementId() {
        return achievementId;
    }
}
