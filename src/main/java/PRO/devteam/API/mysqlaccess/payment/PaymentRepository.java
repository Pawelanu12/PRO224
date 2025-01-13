package PRO.devteam.API.mysqlaccess.payment;

import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface PaymentRepository extends CrudRepository<Payment, BigInteger> {
    Iterable<Payment> findByUserId(BigInteger userId);


}
