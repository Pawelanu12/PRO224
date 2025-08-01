package PRO.devteam.API.mysqlaccess.achievement;


import PRO.devteam.API.mysqlaccess.gainedAchievements.GainedAchievements;
import PRO.devteam.API.mysqlaccess.gainedAchievements.GainedAchievementsRepository;
import PRO.devteam.API.mysqlaccess.gainedAchievements.NoAchievement;
import PRO.devteam.API.mysqlaccess.gainedAchievements.NoUser;
import PRO.devteam.API.mysqlaccess.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Date;
import java.util.Optional;


@Controller
@RequestMapping(path="/api")
public class AchievementController {
    @Autowired
    private AchievementRepository achievementRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GainedAchievementsRepository gainedAchievementsRepository;

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
    public ResponseEntity<Iterable<NoUser>> getAllGainedAchievementsByUserId(@PathVariable(value = "userId") BigInteger userId) {
        if (!userRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        Iterable<NoUser> tags = gainedAchievementsRepository.findByUserId(userId);
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/sprawnosci/{achievementId}/uzytkownicy")
    public ResponseEntity<Iterable<NoAchievement>> getAllUsersByAchievementId(@PathVariable(value = "achievementId") BigInteger achievementId) {
        if (!achievementRepository.existsById(achievementId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Iterable<NoAchievement> users = gainedAchievementsRepository.findByAchievementId(achievementId);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/sprawnosci")
    public ResponseEntity<Achievement> postNewAchievement(@RequestBody Achievement givenAchievement){
        Achievement achievement = achievementRepository.save(new Achievement(
                givenAchievement.getNazwa(), givenAchievement.getOpis(), givenAchievement.getOpisWymagan()));
        return new ResponseEntity<>(achievement, HttpStatus.CREATED);
    }


    @PostMapping("/uzytkownicy/{userId}/sprawnosci/{achievementId}")
    public ResponseEntity<GainedAchievements> postNewAchievementToUser(@PathVariable(value = "userId") BigInteger userId, @PathVariable(value="achievementId") BigInteger achievementId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date)
    {
        if (!achievementRepository.existsById(achievementId) || !userRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);}

        GainedAchievements gainedAchievements = gainedAchievementsRepository.save( new GainedAchievements(
                userRepository.findById(userId).orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing user", null,"Not found user with id = " + userId )),
                achievementRepository.findById(achievementId).orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing achievement", null,"Not found achievement with id = " + achievementId )),
                date
                ));

        return new ResponseEntity<>(gainedAchievements, HttpStatus.ACCEPTED);
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

    @DeleteMapping("/uzytkownicy/{userId}/sprawnosci/{achievementId}")
    public ResponseEntity<HttpStatus> deleteAchievementFromUser(@PathVariable(value = "userId") BigInteger userId, @PathVariable(value = "achievementId") BigInteger achievementId) {
        if (!achievementRepository.existsById(achievementId) || !userRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        GainedAchievements fetchGainedAchievement = gainedAchievementsRepository.findByUserIdAndAchievementId(userId, achievementId);
        gainedAchievementsRepository.delete(fetchGainedAchievement);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/sprawnosci/{achievementId}")
    public ResponseEntity<HttpStatus> deleteAchievement(@PathVariable(value = "achievementId") BigInteger achievementId) {
        achievementRepository.deleteById(achievementId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
