package PRO.devteam.API.mysqlaccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/api/achievement")
public class AchievementController {
    @Autowired
    private AchievementRepository achievementRepository;

    @GetMapping (path = "/all")
    public @ResponseBody Iterable<Achievement> getAllAchievements() { return achievementRepository.findAll();}


}
