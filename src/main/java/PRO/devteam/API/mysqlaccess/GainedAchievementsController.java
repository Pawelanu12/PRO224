package PRO.devteam.API.mysqlaccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigInteger;

@Controller
@RequestMapping(path="/api/gainedAchievements")
public class GainedAchievementsController {
    @Autowired
    private GainedAchievementsRepository gainedAchievementsRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<GainedAchievements> getAllGainedAchievements() {
        return gainedAchievementsRepository.findAll();
    }


    @GetMapping(path="/id")
    public @ResponseBody Iterable<GainedAchievements> getGainedAchievementsById(@RequestParam String uID) {
        return gainedAchievementsRepository.findAllByUserId(new BigInteger((uID)));
    }

}
