package PRO.devteam.API.mysqlaccess.usertype;

import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface UserTypeRepository extends CrudRepository<UserType, BigInteger> {
}
