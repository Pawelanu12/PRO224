package PRO.devteam.API.mysqlaccess.user;

import PRO.devteam.API.mysqlaccess.szostka.SzostkaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Optional;

@Controller
@RequestMapping(path="/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SzostkaRepository szostkaRepository;
    private final BigInteger adminTag = BigInteger.valueOf(1);
    private final BigInteger zuchTag = BigInteger.valueOf(2);


    @GetMapping(path="/uzytkownicy")
    public ResponseEntity< Iterable<User>> getAllUsers() {
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);  }

    @GetMapping(path="/uzytkownicy/admini")
    public ResponseEntity<Iterable<User>> getAllUserAdmin() {
        return new ResponseEntity<>( userRepository.findByTypUzytkownikaId(adminTag), HttpStatus.OK);
    }
    @GetMapping(path="/uzytkownicy/zuchy")
    public ResponseEntity< Iterable<User>> getAllUserZuch() {
        return new ResponseEntity<>( userRepository.findByTypUzytkownikaId(zuchTag), HttpStatus.OK);
    }

    @GetMapping(path="/uzytkownicy/{userId}")
    public ResponseEntity<Optional<User>> getById(@PathVariable(value="userId") BigInteger userId) {
        if (!userRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userRepository.findById(userId), HttpStatus.OK);
    }

    @GetMapping(path="/uzytkownicy/email/{email}")
    public ResponseEntity<User> getByEmail(@PathVariable(value="email") String email) {
        if (!userRepository.existsUserByEmail(email)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userRepository.findByEmail(email), HttpStatus.OK);
    }

    @GetMapping(path=("/uzytkownicy/szostka/{szostkaId}"))
    public ResponseEntity< Iterable<User>> getUsersBySzostka(@PathVariable(value = "szostkaId") BigInteger szostkaId) {
        if (!szostkaRepository.existsById(szostkaId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return  new ResponseEntity<>(userRepository.findBySzostkaId(szostkaId), HttpStatus.OK);
    }

    @PostMapping(path="/uzytkownicy")
    public ResponseEntity<User> postNewUser(@RequestBody User givenUser) {
        User user = userRepository.save(new User(
            givenUser.getRodzicId1(), givenUser.getRodzicId2(), givenUser.getImie(),
                givenUser.getNazwisko(), givenUser.getLogin(), givenUser.getHaslo(),
                givenUser.getTypUzytkownikaId(), givenUser.getEmail(), givenUser.getDataUrodzenia(),
                givenUser.getNrTelefonu(), givenUser.getDataDolaczeniaDoGromady(),givenUser.getSzostkaId()
        ));
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/uzytkownicy/{userId}")
    public ResponseEntity<User> putUser(@PathVariable("userId") BigInteger userId, @RequestBody User givenUser) {
        User user = userRepository.findById(userId).orElseThrow(() -> new InvalidConfigurationPropertyValueException("user not found",null,"Not found Tutorial with id = " + userId));
        user.setRodzicId1(givenUser.getRodzicId1());
        user.setRodzicId2(givenUser.getRodzicId2());
        user.setImie(givenUser.getImie());
        user.setNazwisko(givenUser.getNazwisko());
        user.setLogin(givenUser.getLogin());
        user.setHaslo(givenUser.getHaslo());
        user.setTypUzytkownikaId(givenUser.getTypUzytkownikaId());
        user.setEmail(givenUser.getEmail());
        user.setNrTelefonu(givenUser.getNrTelefonu());
        user.setDataDolaczeniaDoGromady(givenUser.getDataDolaczeniaDoGromady());
        user.setSzostkaId(givenUser.getSzostkaId());
        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
    }

    @DeleteMapping("/uzytkownicy/{userId}")
    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("userId") BigInteger userId) {
        userRepository.deleteById(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
