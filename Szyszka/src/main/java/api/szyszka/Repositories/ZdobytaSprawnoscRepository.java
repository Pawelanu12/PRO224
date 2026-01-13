package api.szyszka.Repositories;

import api.szyszka.Entities.ZdobytaSprawnosc;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ZdobytaSprawnoscRepository extends JpaRepository<ZdobytaSprawnosc, Long> {
    List<ZdobytaSprawnosc> findByUzytkownikId(Long uzytkownikId);
    List<ZdobytaSprawnosc> findBySprawnoscId(Long sprawnoscId);
    //List<ZdobytaSprawnosc> findByUzytkownikId(long uzytkownikId);
}