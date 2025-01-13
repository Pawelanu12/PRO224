package PRO.devteam.API.mysqlaccess.event;

import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface EventRepository extends CrudRepository<Event, BigInteger> {
    Iterable<Event> findAttendanceByUsersId(BigInteger userId);
}
