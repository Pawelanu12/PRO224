package PRO.devteam.API.mysqlaccess.attendence;

import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface AttendenceRepository extends CrudRepository<Attendance, BigInteger> {
    Iterable<Attendance> findByWydarzenieId(BigInteger id);
}
