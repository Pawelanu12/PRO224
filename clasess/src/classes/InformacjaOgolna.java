package classes;

import java.time.LocalDateTime;

public class InformacjaOgolna {
    private Long id;
    private LocalDateTime date;
    private String text;
}
//czy informacja na stronie jest odnowiana od czasu lub zawsze taka sama?
//to jest to o czym mowisz
//a gdzie wtedy jezeli nie w bazie?
//w html trzeba bedzie zawsze program restartowac
//bo jezeli edetujesz tylko strone to przy odswezeniu wszystkiego nie bedze
// zeby cos zmienilo ono musi byc przechowywane lub w pliku lub w bazie

//na poczatku wszystko bedzie w  pliku
//a potem juz do bazy zrobimy
//to co nie zmienia mona w pliku zostawic

//jezeli informacja zmienia co tydzen to ta klasa potrzebna

