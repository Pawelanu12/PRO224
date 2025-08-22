package api.szyszka.Repositories;

import api.szyszka.Entities.Czat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CzatRepository extends JpaRepository<Czat, Long> {
}
