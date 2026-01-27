package api.szyszka.Repositories;

import api.szyszka.Entities.Komentarz;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface KomentarzRepository extends JpaRepository<Komentarz, Long> {
    Optional<Komentarz> findKomentarzById(Long id);
    List<Komentarz> findByPostId(Long postId);

    List<Komentarz> findByAutor_Id(Long autorId);
}