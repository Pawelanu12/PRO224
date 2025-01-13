package PRO.devteam.API.mysqlaccess.event;

import PRO.devteam.API.mysqlaccess.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigInteger;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "Wydarzenie")
public class Event {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger id;
    @Column(name = "UzytkownikID")
    private String uzytkownikId;
    @Column(name = "nazwa")
    private String nazwa;
    @Column(name = "dataWyjazdu")
    private Date dataWyjazdu;
    @Column(name = "datazakonczenia")
    private Date dataZakonczenia;
    @Column(name = "opis")
    private String opis;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "attendance")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public Event() {}
    public Event(String uzytkownikId, String nazwa, Date dataWyjazdu, Date dataZakonczenia, String opis) {
        this.uzytkownikId = uzytkownikId;
        this.nazwa = nazwa;
        this.dataWyjazdu = dataWyjazdu;
        this.dataZakonczenia = dataZakonczenia;
        this.opis = opis;
    }

    public BigInteger getId() {
        return id;
    }

    public String getUzytkownikId() {
        return uzytkownikId;
    }

    public String getNazwa() {
        return nazwa;
    }

    public Date getDataWyjazdu() {
        return dataWyjazdu;
    }

    public Date getDataZakonczenia() {
        return dataZakonczenia;
    }

    public String getOpis() {
        return opis;
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

    public void setUzytkownikId(String uzytkownikId) {
        this.uzytkownikId = uzytkownikId;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public void setDataWyjazdu(Date dataWyjazdu) {
        this.dataWyjazdu = dataWyjazdu;
    }

    public void setDataZakonczenia(Date dataZakonczenia) {
        this.dataZakonczenia = dataZakonczenia;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }
}
