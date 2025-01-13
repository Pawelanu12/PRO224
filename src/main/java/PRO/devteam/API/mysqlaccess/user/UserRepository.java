package PRO.devteam.API.mysqlaccess.user;

import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;
import java.util.Collection;

public interface UserRepository extends CrudRepository<User, BigInteger> {
   Iterable<User> findBySzostkaId(BigInteger szostkaId);
   User findByEmail(String email);
   Iterable<User> findByTypUzytkownikaId(BigInteger userTypeId);
   Iterable<User> findByRodzicId1In(Collection<BigInteger> parentId);
   Iterable<User> findByRodzicId2In(Collection<BigInteger> parentId);
   Iterable<User> findUserByGainedAchievementsId(BigInteger achievementId);
   Iterable<User> findUserByAttendanceId(BigInteger achievementId);

   boolean existsUserByEmail(String email);

}
