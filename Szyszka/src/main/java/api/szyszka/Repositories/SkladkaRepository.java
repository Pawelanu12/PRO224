package api.szyszka.Repositories;


import api.szyszka.Entities.Skladka;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkladkaRepository extends JpaRepository<Skladka, Long> {
    List<Skladka> findByUzytkownikId(Long uzytkownikId);
}