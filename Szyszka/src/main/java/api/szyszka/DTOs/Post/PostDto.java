package api.szyszka.DTOs.Post;

import api.szyszka.DTOs.Post.CreatePostRequest;
import api.szyszka.DTOs.Post.KomentarzDto;
import api.szyszka.Entities.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Long id;
    private LocalDateTime dataStworzenia;
    private String tresc;
    private List<Long> polubienia;
    private String autorLogin;
    private List<KomentarzDto> komentarze;
    private List<String> zdjecia;

    public static Post fromCreateRequest(CreatePostRequest request) {
        Post p = new Post();
        p.setTresc(request.getTresc());
        return p;
    }
}
