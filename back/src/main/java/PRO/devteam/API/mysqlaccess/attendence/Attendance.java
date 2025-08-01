package PRO.devteam.API.mysqlaccess.attendence;

import PRO.devteam.API.mysqlaccess.event.Event;
import PRO.devteam.API.mysqlaccess.user.User;
import jakarta.persistence.*;

import java.math.BigInteger;

@Entity (name = "uczestnictwo")
public class Attendance {
    @Id
    @Column(name = "id", columnDefinition = "BIGINT")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger id;


    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "uzytkownikid", columnDefinition = "BIGINT")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "wydarzenieid", columnDefinition = "BIGINT")
    private Event event;

    @Column (name = "obecny", columnDefinition = "boolean default false")
    private Boolean obecny;

    public Attendance() {}

    public Attendance(User user, Event event, Boolean obecny) {
        this.user = user;
        this.event = event;
        this.obecny = obecny;
    }

    public BigInteger getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Event getEvent() {
        return event;
    }



    public Boolean getObecny() {
        return obecny;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setEvent(Event event) {
        this.event = event;
    }



    public void setObecny(Boolean obecny) {
        this.obecny = obecny;
    }


}
