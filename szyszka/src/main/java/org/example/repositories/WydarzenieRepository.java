package org.example.repositories;

import org.example.entities.Wydarzenie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WydarzenieRepository extends JpaRepository<Wydarzenie, Long> {

    Wydarzenie findByNazwa(String nazwa);

    Wydarzenie findByDataWyjazdu(LocalDateTime dataWyjazdu);

    Wydarzenie findByDataZakonczenia(LocalDateTime dataZakonczenia);

    List<Wydarzenie> findByOrganizatorId(Long organizatorId);
}
