package PRO.devteam.API.mysqlaccess.gainedAchievements;

import PRO.devteam.API.mysqlaccess.achievement.Achievement;

import java.math.BigInteger;
import java.util.Date;

public interface NoUser {
    BigInteger getId();
    Achievement getAchievement();
    Date getDataZdobyciaSprawnosci();
}
