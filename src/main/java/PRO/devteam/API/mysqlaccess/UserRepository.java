package PRO.devteam.API.mysqlaccess;

import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface UserRepository extends CrudRepository<User, BigInteger> {

}
