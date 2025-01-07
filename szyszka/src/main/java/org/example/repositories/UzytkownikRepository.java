package org.example.repositories;

import org.example.entities.Uzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UzytkownikRepository extends JpaRepository<Uzytkownik, Long> {


    Optional<Uzytkownik> findById(Long id);


    Optional<Uzytkownik> findByLogin(String login);


    Optional<Uzytkownik> findByEmail(String email);

    List<Uzytkownik> findByNazwiskoContaining(String fragmentNazwiska);

}
