package PRO.devteam.API.mysqlaccess.attendence;

import PRO.devteam.API.mysqlaccess.user.User;

import java.math.BigInteger;

public interface NoEvent {
    BigInteger getId();
    User getUser();

    Boolean getObecny();
}
