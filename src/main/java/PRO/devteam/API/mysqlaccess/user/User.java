package PRO.devteam.API.mysqlaccess.user;

import PRO.devteam.API.mysqlaccess.achievement.Achievement;
import PRO.devteam.API.mysqlaccess.event.Event;
import jakarta.persistence.*;

import java.math.BigInteger;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity ( name = "uzytkownik")
public class User {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger id;
    @Column(name = "rodzicID1")
    private BigInteger rodzicId1;
    @Column(name = "rodzicID2")
    private BigInteger rodzicId2;

    @Column(name = "imie")
    private String imie;
    @Column(name = "nazwisko")
    private String nazwisko;
    @Column(name = "login")
    private String login;
    @Column(name = "haslo")
    private String haslo;
    @Column(name = "TypUzytkownikaID")
    private BigInteger typUzytkownikaId;
    @Column(name = "email")
    private String email;
    @Column(name = "dataUrodzenia")
    private Date dataUrodzenia;

    @Column(name = "nrTelefonu")
    private String nrTelefonu;
    @Column(name = "dataDolaczeniaDoGromady")
    private Date dataDolaczeniaDoGromady;
    @Column(name = "SzostkaID")
    private BigInteger szostkaId;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "zdobyteSprawnosci",
            joinColumns = { @JoinColumn(name = "UzytkownikID") },
            inverseJoinColumns = { @JoinColumn(name = "SprawnoscID") })
    private Set<Achievement> gainedAchievements = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "uczestnictwo",
            joinColumns = { @JoinColumn(name = "UzytkownikID") },
            inverseJoinColumns = { @JoinColumn(name = "WydarzenieID") })
    private Set<Event> attendance = new HashSet<>();

    public User() {

    }

    public User(BigInteger rodzicID1, BigInteger rodzicID2, String imie, String nazwisko, String login, String haslo, BigInteger typUzytkownikaId, String email, Date dataUrodzenia, String nrTelefonu, Date dataDolaczeniaDoGromady, BigInteger szostkaID) {
        this.rodzicId1 = rodzicID1;
        this.rodzicId2 = rodzicID2;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.login = login;
        this.haslo = haslo;
        this.typUzytkownikaId = typUzytkownikaId;
        this.email = email;
        this.dataUrodzenia = dataUrodzenia;
        this.nrTelefonu = nrTelefonu;
        this.dataDolaczeniaDoGromady = dataDolaczeniaDoGromady;
        this.szostkaId = szostkaID;
    }

    public void addAchievement(Achievement achievement) {
        this.gainedAchievements.add(achievement);
        achievement.getUsers().add(this);
    }

    public void removeAchievement(BigInteger achievementId) {
        Achievement achievement = this.gainedAchievements.stream().filter(t -> t.getId() == achievementId).findFirst().orElse(null);
        if (achievement != null) {
            this.gainedAchievements.remove(achievement);
            achievement.getUsers().remove(this);
        }
    }

    public void addAttendence(Event event) {
        this.attendance.add(event);
        event.getUsers().add(this);
    }

    public void removeAttendence(BigInteger eventId) {
        Event event = this.attendance.stream().filter(t -> t.getId() == eventId).findFirst().orElse(null);
        if (event != null) {
            this.attendance.remove(event);
            event.getUsers().remove(this);
        }
    }


    public BigInteger getId() {
        return id;
    }

    public BigInteger getRodzicId1() {
        return rodzicId1;
    }

    public BigInteger getRodzicId2() {
        return rodzicId2;
    }

    public String getImie() {
        return imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public String getLogin() {
        return login;
    }

    public String getHaslo() {
        return haslo;
    }

    public BigInteger getTypUzytkownikaId() {
        return typUzytkownikaId;
    }

    public String getEmail() {
        return email;
    }

    public Date getDataUrodzenia() {
        return dataUrodzenia;
    }

    public String getNrTelefonu() {
        return nrTelefonu;
    }

    public Date getDataDolaczeniaDoGromady() {
        return dataDolaczeniaDoGromady;
    }

    public BigInteger getSzostkaId() {
        return szostkaId;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setRodzicId1(BigInteger rodzicId1) {
        this.rodzicId1 = rodzicId1;
    }

    public void setRodzicId2(BigInteger rodzicId2) {
        this.rodzicId2 = rodzicId2;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setHaslo(String haslo) {
        this.haslo = haslo;
    }

    public void setTypUzytkownikaId(BigInteger typUzytkownikaId) {
        this.typUzytkownikaId = typUzytkownikaId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDataUrodzenia(Date dataUrodzenia) {
        this.dataUrodzenia = dataUrodzenia;
    }

    public void setNrTelefonu(String nrTelefonu) {
        this.nrTelefonu = nrTelefonu;
    }

    public void setDataDolaczeniaDoGromady(Date dataDolaczeniaDoGromady) {
        this.dataDolaczeniaDoGromady = dataDolaczeniaDoGromady;
    }

    public void setSzostkaId(BigInteger szostkaId) {
        this.szostkaId = szostkaId;
    }
}
