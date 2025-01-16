package PRO.devteam.API.mysqlaccess.gainedAchievements;

import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface GainedAchievementsRepository extends CrudRepository<GainedAchievements, BigInteger> {
    Iterable<NoUser> findByUserId(BigInteger userId);
    Iterable<NoAchievement> findByAchievementId(BigInteger achievementId);
    GainedAchievements findByUserIdAndAchievementId(BigInteger userId, BigInteger achievementId);
}
