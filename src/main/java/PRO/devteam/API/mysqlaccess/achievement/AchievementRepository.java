package PRO.devteam.API.mysqlaccess.achievement;

import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface AchievementRepository extends CrudRepository<Achievement, BigInteger> {
}
