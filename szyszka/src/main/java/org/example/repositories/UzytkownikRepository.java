package org.example.repositories;

import org.example.entities.Uzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UzytkownikRepository extends JpaRepository<Uzytkownik, Long> {

    // Znajdź użytkownika po ID
    Optional<Uzytkownik> findById(Long id);

    // Znajdź użytkownika po loginie
    Optional<Uzytkownik> findByLogin(String login);

    // Znajdź wszystkich użytkowników w danej szóstce
    List<Uzytkownik> findBySzostkaId(Long szostkaId);

    // Znajdź użytkowników, którzy mają określony adres email
    Optional<Uzytkownik> findByEmail(String email);

    // Znajdź wszystkich użytkowników, którzy dołączyli do gromady po określonej dacie
    List<Uzytkownik> findByDataDolaczeniaDoGromadyAfter(java.time.LocalDateTime data);

    // Znajdź wszystkich użytkowników, których nazwisko zawiera podany ciąg znaków (np. wyszukiwanie częściowe)
    List<Uzytkownik> findByNazwiskoContaining(String fragmentNazwiska);

    // Znajdź wszystkich użytkowników mających danego rodzica
    List<Uzytkownik> findByRodzic1IdOrRodzic2Id(Long rodzic1Id, Long rodzic2Id);
}
