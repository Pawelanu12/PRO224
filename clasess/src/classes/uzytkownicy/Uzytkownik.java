package classes.uzytkownicy;

import java.time.LocalDate;

public class Uzytkownik {
    private Long id;
    private String imie;
    private String nazwisko;
    private TypUzytkownika typUzytkownika;
    private String login;
    private String password;
    public String email;
    private LocalDate dataUrodzenia;
}
