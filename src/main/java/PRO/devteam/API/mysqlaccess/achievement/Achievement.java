package PRO.devteam.API.mysqlaccess.achievement;


import PRO.devteam.API.mysqlaccess.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "sprawnosc")
public class Achievement {
    @Id
    @Column (name = "id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger id;
    @Column (name = "nazwa")
    private String nazwa;
    @Column (name = "opis")
    private String opis;
    @Column (name = "opisWymagan")
    private String opisWymagan;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "gainedAchievements")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public Achievement() {}

    public Achievement(String nazwa, String opis, String opisWymagan) {
        this.nazwa = nazwa;
        this.opis = opis;
        this.opisWymagan = opisWymagan;
    }

    public BigInteger getId() {
        return id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public String getOpis() {
        return opis;
    }

    public String getOpisWymagan() {
        return opisWymagan;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public void setOpisWymagan(String opisWymagan) {
        this.opisWymagan = opisWymagan;
    }


}
