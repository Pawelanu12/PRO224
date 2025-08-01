package PRO.devteam.API.mysqlaccess.payment;

import PRO.devteam.API.mysqlaccess.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@Controller
@RequestMapping(path = "/api")
public class PaymentController {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping(path="/uzytkownicy/skladki")
    public ResponseEntity<Iterable<Payment>> getAllPayments()
    {
        Iterable<Payment> allPayments = paymentRepository.findAll();
        return new ResponseEntity<>(allPayments, HttpStatus.OK);
    }

    @GetMapping(path="/uzytkownicy/skladki/{paymentId}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable(value = "paymentId") BigInteger paymentId)
    {
        if (!paymentRepository.existsById(paymentId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Payment payment = paymentRepository.findById(paymentId).orElseThrow(() -> new InvalidConfigurationPropertyValueException("payment not found",null,"Not found Payment with id = " + paymentId));;
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    @GetMapping(path="/uzytkownicy/{userId}/skladki")
    public ResponseEntity<Iterable<Payment>> getUserPaymentsByUserId(@PathVariable(name = "userId") BigInteger userId)
    {
        if (!userRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Iterable<Payment> userPayments = paymentRepository.findByUserId(userId);
        return new ResponseEntity<>(userPayments, HttpStatus.OK);
    }


    @PostMapping("uzytkownicy/{userId}/skladki")
    public ResponseEntity<Payment> postNewPayment(@PathVariable(value = "userId") BigInteger userId,
                                                 @RequestBody Payment givenPayment) {
        Payment newPayment = userRepository.findById(userId).map(user -> {
            givenPayment.setUser(user);
            return paymentRepository.save(givenPayment);
        }).orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing user", null,"Not found User with id = " + userId ));

        return new ResponseEntity<>(newPayment, HttpStatus.CREATED);
    }

    @PutMapping("/uzytkownicy/skladki/{paymentId}")
    public ResponseEntity<Payment> putPayment(@PathVariable(value = "paymentId") BigInteger paymentId, @RequestBody Payment givenPayment) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing record", null, "Payment with id " + paymentId + "not found"));

        payment.setNazwa(givenPayment.getNazwa());
        payment.setDataWplaty(givenPayment.getDataWplaty());
        payment.setKwota(givenPayment.getKwota());

        return new ResponseEntity<>(paymentRepository.save(payment), HttpStatus.OK);
    }

    @DeleteMapping("/uzytkownicy/skladki/{paymentId}")
    public ResponseEntity<HttpStatus> deletePayment(@PathVariable(value = "paymentId") BigInteger paymentId) {
        paymentRepository.deleteById(paymentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
