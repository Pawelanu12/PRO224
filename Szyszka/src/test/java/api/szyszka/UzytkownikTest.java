package api.szyszka;

import api.szyszka.Entities.Uzytkownik;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class UzytkownikTest {

    @Test
    public void testGettersAndSetters() {
        Uzytkownik u = new Uzytkownik();

        u.setImie("Jan");
        u.setNazwisko("Kowalski");
        u.setLogin("jan.k");
        u.setDataUrodzenia(LocalDateTime.of(1990, 1, 1, 0, 0));

        assertEquals("Jan", u.getImie());
        assertEquals("Kowalski", u.getNazwisko());
        assertEquals("jan.k", u.getLogin());
        assertEquals(LocalDateTime.of(1990, 1, 1, 0, 0), u.getDataUrodzenia());
    }
}
