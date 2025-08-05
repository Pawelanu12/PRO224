package api.szyszka.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Uzytkownik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imie;
    private String nazwisko;

    @Column(unique = true, nullable = false)
    private String login;

    private String haslo;
    private String email;
    private LocalDateTime dataUrodzenia;
    private String nrTelefonu;
    private LocalDateTime dataDolaczeniaDoGromady;

    @ManyToOne
    @JoinColumn(name = "rodzic_id1")
    private Uzytkownik rodzic1;

    @ManyToOne
    @JoinColumn(name = "rodzic_id2")
    private Uzytkownik rodzic2;

    private String typUzytkownika;

    @ManyToOne
    @JoinColumn(name = "szostka_id")
    private Szostka szostka;

    @OneToMany(mappedBy = "uzytkownik")
    private List<Skladka> skladki;

    @OneToMany(mappedBy = "uzytkownik")
    private List<ZdobyteSprawnosci> zdobyteSprawnosci;

    @OneToMany(mappedBy = "organizator")
    private List<Wydarzenie> wydarzenia;

    @OneToMany(mappedBy = "autor")
    private List<Post> posty;

    @OneToMany(mappedBy = "autor")
    private List<Komentarz> komentarze;

    @OneToMany(mappedBy = "uzytkownik")
    private List<Zdjecie> zdjecia;

    @OneToMany(mappedBy = "uzytkownik")
    private List<Uczestnictwo> uczestnictwa;

    public Long getId() {
        return id;
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

    public String getEmail() {
        return email;
    }

    public LocalDateTime getDataUrodzenia() {
        return dataUrodzenia;
    }

    public String getNrTelefonu() {
        return nrTelefonu;
    }

    public LocalDateTime getDataDolaczeniaDoGromady() {
        return dataDolaczeniaDoGromady;
    }

    public Uzytkownik getRodzic1() {
        return rodzic1;
    }

    public Uzytkownik getRodzic2() {
        return rodzic2;
    }

    public String getTypUzytkownika() {
        return typUzytkownika;
    }

    public Szostka getSzostka() {
        return szostka;
    }

    public List<Skladka> getSkladki() {
        return skladki;
    }

    public List<ZdobyteSprawnosci> getZdobyteSprawnosci() {
        return zdobyteSprawnosci;
    }

    public List<Wydarzenie> getWydarzenia() {
        return wydarzenia;
    }

    public List<Post> getPosty() {
        return posty;
    }

    public List<Komentarz> getKomentarze() {
        return komentarze;
    }

    public List<Zdjecie> getZdjecia() {
        return zdjecia;
    }

    public List<Uczestnictwo> getUczestnictwa() {
        return uczestnictwa;
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

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDataUrodzenia(LocalDateTime dataUrodzenia) {
        this.dataUrodzenia = dataUrodzenia;
    }

    public void setNrTelefonu(String nrTelefonu) {
        this.nrTelefonu = nrTelefonu;
    }

    public void setDataDolaczeniaDoGromady(LocalDateTime dataDolaczeniaDoGromady) {
        this.dataDolaczeniaDoGromady = dataDolaczeniaDoGromady;
    }

    public void setRodzic1(Uzytkownik rodzic1) {
        this.rodzic1 = rodzic1;
    }

    public void setRodzic2(Uzytkownik rodzic2) {
        this.rodzic2 = rodzic2;
    }

    public void setTypUzytkownika(String typUzytkownika) {
        this.typUzytkownika = typUzytkownika;
    }

    public void setSzostka(Szostka szostka) {
        this.szostka = szostka;
    }

    public void setSkladki(List<Skladka> skladki) {
        this.skladki = skladki;
    }

    public void setZdobyteSprawnosci(List<ZdobyteSprawnosci> zdobyteSprawnosci) {
        this.zdobyteSprawnosci = zdobyteSprawnosci;
    }

    public void setWydarzenia(List<Wydarzenie> wydarzenia) {
        this.wydarzenia = wydarzenia;
    }

    public void setPosty(List<Post> posty) {
        this.posty = posty;
    }

    public void setKomentarze(List<Komentarz> komentarze) {
        this.komentarze = komentarze;
    }

    public void setZdjecia(List<Zdjecie> zdjecia) {
        this.zdjecia = zdjecia;
    }

    public void setUczestnictwa(List<Uczestnictwo> uczestnictwa) {
        this.uczestnictwa = uczestnictwa;
    }
}