package PRO.devteam.API.mysqlaccess.gainedAchievements;

import PRO.devteam.API.mysqlaccess.user.User;

import java.math.BigInteger;
import java.util.Date;

public interface NoAchievement {
    BigInteger getId();
    User getUser();
    Date getDataZdobyciaSprawnosci();
}
