package PRO.devteam.API.mysqlaccess.attendence;

import jakarta.persistence.*;
import org.hibernate.type.descriptor.jdbc.TinyIntJdbcType;

import java.math.BigInteger;
import java.sql.Date;

@Entity (name = "uczestnictwo")
public class Attendance {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger id;

    @Column (name = "UzytkownikID")
    private BigInteger uzytownikId;

    @Column (name = "WydarzenieID")
    private BigInteger wydarzenieId;

    @Column (name = "dataZakonczenia")
    private Date dataZakonczenia;

    @Column (name = "obecny")
    private TinyIntJdbcType obecny;

    public Attendance() {}

    public Attendance(BigInteger id, BigInteger uzytownikId, BigInteger wydarzenieId, Date dataZakonczenia, TinyIntJdbcType obecny) {
        this.id = id;
        this.uzytownikId = uzytownikId;
        this.wydarzenieId = wydarzenieId;
        this.dataZakonczenia = dataZakonczenia;
        this.obecny = obecny;
    }

    public BigInteger getId() {
        return id;
    }

    public BigInteger getUzytownikId() {
        return uzytownikId;
    }

    public BigInteger getWydarzenieId() {
        return wydarzenieId;
    }

    public Date getDataZakonczenia() {
        return dataZakonczenia;
    }

    public TinyIntJdbcType getObecny() {
        return obecny;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public void setUzytownikId(BigInteger uzytownikId) {
        this.uzytownikId = uzytownikId;
    }

    public void setWydarzenieId(BigInteger wydarzenieId) {
        this.wydarzenieId = wydarzenieId;
    }

    public void setDataZakonczenia(Date dataZakonczenia) {
        this.dataZakonczenia = dataZakonczenia;
    }

    public void setObecny(TinyIntJdbcType obecny) {
        this.obecny = obecny;
    }
}
