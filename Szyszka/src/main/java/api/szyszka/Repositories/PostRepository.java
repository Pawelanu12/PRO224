package api.szyszka.Repositories;

import api.szyszka.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAutorId(Long autorId);
}

