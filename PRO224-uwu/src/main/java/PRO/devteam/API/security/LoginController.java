package PRO.devteam.API.security;

import jakarta.servlet.http.*;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import PRO.devteam.API.mysqlaccess.user.User;
import PRO.devteam.API.mysqlaccess.user.UserRepository;

import java.math.BigInteger;
import java.util.Date;

@Controller
public class LoginController {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    public LoginController(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam("login") String login,
                                       @RequestParam("password") String password) {
        User user = userRepository.findByLogin(login);
        if (user != null && bCryptPasswordEncoder.matches(password, user.getHaslo())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login or password");
    }

    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        user.setHaslo(bCryptPasswordEncoder.encode(user.getHaslo()));
        userRepository.save(user);
        return ResponseEntity.ok("User created successfully");
    }

}