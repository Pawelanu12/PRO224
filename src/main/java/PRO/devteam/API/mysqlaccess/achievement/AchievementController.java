package PRO.devteam.API.mysqlaccess.achievement;


import PRO.devteam.API.mysqlaccess.user.User;
import PRO.devteam.API.mysqlaccess.user.UserRepository;
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
public class AchievementController {
    @Autowired
    private AchievementRepository achievementRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping (path = "/sprawnosci")
    public ResponseEntity<Iterable<Achievement>> getAllAchievements() {
        return new ResponseEntity<>(achievementRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping (path = "/sprawnosci/{achievementId}")
    public ResponseEntity<Optional<Achievement>> getAchievementById(@PathVariable BigInteger achievementId) {
        if (!achievementRepository.existsById(achievementId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
            return new ResponseEntity<>(achievementRepository.findById(achievementId), HttpStatus.OK);
    }

    @GetMapping("/uzytkownicy/{userId}/sprawnosci")
    public ResponseEntity<Iterable<Achievement>> getAllGainedAchievementsByUserId(@PathVariable(value = "userId") BigInteger userId) {
        if (!userRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        Iterable<Achievement> tags = achievementRepository.findGainedAchievementsByUsersId(userId);
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/sprawnosci/{achievementId}/uzytkownicy")
    public ResponseEntity<Iterable<User>> getAllUsersByAchievementId(@PathVariable(value = "achievementId") BigInteger achievementId) {
        if (!achievementRepository.existsById(achievementId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Iterable<User> users = userRepository.findUserByGainedAchievementsId(achievementId);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/sprawnosci")
    public ResponseEntity<Achievement> postNewAchievement(@RequestBody Achievement givenAchievement){
        Achievement achievement = achievementRepository.save(new Achievement(
                givenAchievement.getNazwa(), givenAchievement.getOpis(), givenAchievement.getOpisWymagan()));
        return new ResponseEntity<>(achievement, HttpStatus.CREATED);
    }

    //todo
    @PostMapping("/uzytkownicy/{userId}/sprawnosci/{achievementId}")
    public ResponseEntity<Achievement> postNewAchievementToUser(@PathVariable(value = "userId") BigInteger userId, @PathVariable(value="achievementId") BigInteger achievementId) {
        Achievement responseAchievement = userRepository.findById(userId).map(user-> {
                Achievement achievement = achievementRepository.findById(achievementId)
                        .orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing achievement", null,"Not found achievement with id = " + achievementId ));
                user.addAchievement(achievement);
                userRepository.save(user);
                return achievement;
        }).orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing user", null,"Not found a user with id = " + userId ));

        return new ResponseEntity<>(responseAchievement, HttpStatus.ACCEPTED);
    }

    @PutMapping("/sprawnosci/{achievementId}")
    public ResponseEntity<Achievement> putAchievement(@PathVariable("achievementId") BigInteger achievementId, @RequestBody Achievement givenAchievement) {
        Achievement achievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing achievement", null,"Not found achievement with id = " + achievementId ));

        achievement.setOpis(givenAchievement.getOpis());
        achievement.setNazwa(givenAchievement.getNazwa());
        achievement.setOpisWymagan(givenAchievement.getOpisWymagan());

        return new ResponseEntity<>(achievementRepository.save(achievement), HttpStatus.OK);
    }

    //TODO
    @DeleteMapping("/uzytkownicy/{userId}/sprawnosci/{achievementId}")
    public ResponseEntity<HttpStatus> deleteAchievementFromUser(@PathVariable(value = "userId") BigInteger userId, @PathVariable(value = "achievementId") BigInteger achievementId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing user", null,"Not found a user with id = " + userId ));

        user.removeAchievement(achievementId);
        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/sprawnosci/{achievementId}")
    public ResponseEntity<HttpStatus> deleteAchievement(@PathVariable(value = "achievementId") BigInteger achievementId) {
        achievementRepository.deleteById(achievementId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
