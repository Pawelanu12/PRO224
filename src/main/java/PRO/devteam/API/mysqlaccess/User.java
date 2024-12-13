package PRO.devteam.API.mysqlaccess;

import jakarta.persistence.*;

import java.math.BigInteger;
import java.sql.Date;
import java.util.Set;

@Entity ( name = "uzytkownik")
public class User {

    public BigInteger getId() {
        return id;
    }

    public Integer getRodzicID1() {
        return rodzicID1;
    }

    public Integer getRodzicID2() {
        return rodzicID2;
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

    public Integer getTypUzytkownikaID() {
        return TypUzytkownikaID;
    }

    public String getEmail() {
        return email;
    }

    public Date getDataURodzenia() {
        return dataURodzenia;
    }

    public String getNrTelefonu() {
        return nrTelefonu;
    }

    public Date getDataDolaczeniaDoGromady() {
        return dataDolaczeniaDoGromady;
    }

    public Integer getSzostkaID() {
        return SzostkaID;
    }

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    public BigInteger id;
    @Column(name = "rodzicID1")
    private Integer rodzicID1;
    @Column(name = "rodzicID2")
    private Integer rodzicID2;

    @Column(name = "imie")
    private String imie;
    @Column(name = "nazwisko")
    private String nazwisko;
    @Column(name = "login")
    private String login;
    @Column(name = "haslo")
    private String haslo;
    @Column(name = "TypUzytkownikaID")
    private Integer TypUzytkownikaID;
    @Column(name = "email")
    private String email;
    @Column(name = "dataUrodzenia")
    private Date dataURodzenia;

    @Column(name = "nrTelefonu")
    private String nrTelefonu;
    @Column(name = "dataDolaczeniaDoGromady")
    private Date dataDolaczeniaDoGromady;
    @Column(name = "SzostkaID")
    private Integer SzostkaID;


    @OneToMany(mappedBy = "user")
    Set<GainedAchievements> dataZdobyciaSprawnosci;



}
