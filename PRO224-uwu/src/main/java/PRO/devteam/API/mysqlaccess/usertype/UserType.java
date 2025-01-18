package PRO.devteam.API.mysqlaccess.usertype;

import jakarta.persistence.*;

import java.math.BigInteger;

@Entity (name = "typUzytkownika")
public class UserType {
    @Id
    @Column(name="id", columnDefinition = "BIGINT")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private BigInteger id;

    @Column (name = "nazwa")
    private String name;

    @Column (name = "opis")
    private String opis;

    public UserType() {}

    public UserType(String name, String opis) {
        this.name = name;
        this.opis = opis;
    }

    public BigInteger getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getOpis() {
        return opis;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }
}
