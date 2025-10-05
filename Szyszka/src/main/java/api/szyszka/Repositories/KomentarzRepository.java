package api.szyszka.Repositories;

import api.szyszka.Entities.Komentarz;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KomentarzRepository extends JpaRepository<Komentarz, Long> {
    List<Komentarz> findByPostId(Long postId);
}