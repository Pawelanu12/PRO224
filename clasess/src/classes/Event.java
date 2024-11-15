package classes;

import classes.uzytkownicy.Uzytkownik;
import classes.uzytkownicy.Zuch;

import java.time.LocalDateTime;
import java.util.List;

public class Event {
    private Long id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String nazwa;
    private String opis;
    private List<Zuch> uczestnicy;
    private List<Uzytkownik> opekuny;
    private float kwota;
}
