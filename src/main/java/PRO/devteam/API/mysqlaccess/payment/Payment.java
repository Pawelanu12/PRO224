package PRO.devteam.API.mysqlaccess.payment;

import PRO.devteam.API.mysqlaccess.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigInteger;
import java.sql.Date;

@Entity (name = "skladka")
public class Payment {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger id;

    @Column(name = "nazwa")
    private String nazwa;

    @Column(name = "dataWplaty")
    private Date dataWplaty;

    @Column(insertable=false, updatable=false,name = "uzytkownikId")
    private BigInteger uzytkownikId;

    @Column(name = "kwota")
    private Integer kwota;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "uzytkownikId", nullable = false)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JsonIgnore
    private User user;

    public Payment() {}

    public Payment(String nazwa, Date dataWplaty, Integer kwota) {
        this.nazwa = nazwa;
        this.dataWplaty = dataWplaty;
        this.kwota = kwota;
    }

    public BigInteger getId() {
        return id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public Date getDataWplaty() {
        return dataWplaty;
    }

    public BigInteger getUzytkownikId() {
        return uzytkownikId;
    }

    public Integer getKwota() {
        return kwota;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public void setDataWplaty(Date dataWplaty) {
        this.dataWplaty = dataWplaty;
    }

    public void setUzytkownikId(BigInteger uzytkownikId) {
        this.uzytkownikId = uzytkownikId;
    }

    public void setKwota(Integer kwota) {
        this.kwota = kwota;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
