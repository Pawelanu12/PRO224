package PRO.devteam.API.mysqlaccess.payment;

import PRO.devteam.API.mysqlaccess.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigInteger;
import java.util.Date;

@Entity (name = "skladka")
public class Payment {
    @Id
    @Column(name = "id", columnDefinition = "BIGINT")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger id;

    @Column(name = "nazwa")
    private String nazwa;

    @Column(name = "dataWplaty")
    private Date dataWplaty;

    @Column(insertable=false, updatable=false,name = "uzytkownikid")
    private BigInteger uzytkownikId;

    @Column(name = "kwota")
    private Float kwota;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(columnDefinition = "BIGINT", name = "uzytkownikid", nullable = false)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JsonIgnore
    private User user;

    public Payment() {}

    public Payment(String nazwa, Date dataWplaty, Float kwota) {
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

    public Float getKwota() {
        return kwota;
    }

    public User getUser() {
        return user;
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

    public void setKwota(Float kwota) {
        this.kwota = kwota;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
