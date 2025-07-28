package api.szyszka.Repositories;

import api.szyszka.Entities.Wydarzenie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WydarzenieRepository extends JpaRepository<Wydarzenie, Long> {
    List<Wydarzenie> findByOrganizatorId(Long organizatorId);
}