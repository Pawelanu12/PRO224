package PRO.devteam.API.mysqlaccess.attendence;

import PRO.devteam.API.mysqlaccess.event.Event;

import java.math.BigInteger;

public interface NoUser {
    BigInteger getId();
    Event getEvent();
    Boolean getObecny();
}
