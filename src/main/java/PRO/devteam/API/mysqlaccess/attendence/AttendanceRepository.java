package PRO.devteam.API.mysqlaccess.attendence;

import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface AttendanceRepository extends CrudRepository<Attendance, BigInteger> {
    Iterable<NoUser> findByUserId(BigInteger userId);
    Iterable<NoEvent> findByEventId(BigInteger eventId);
    Attendance findByUserIdAndEventId(BigInteger userId, BigInteger eventId);
}
