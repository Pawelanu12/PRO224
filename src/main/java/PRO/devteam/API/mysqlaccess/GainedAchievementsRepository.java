package PRO.devteam.API.mysqlaccess;

import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface GainedAchievementsRepository extends CrudRepository<GainedAchievements, BigInteger> {
    Iterable<GainedAchievements> findAllByUserId(BigInteger id);
}
