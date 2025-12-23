package api.szyszka.Repositories;

import api.szyszka.Entities.Czat;
import api.szyszka.Entities.Post_polubienia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostPolubeniaRepository  extends JpaRepository<Post_polubienia, Long> {
}
