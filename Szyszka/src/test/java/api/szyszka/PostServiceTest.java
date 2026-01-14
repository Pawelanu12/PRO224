package api.szyszka;

import api.szyszka.DTOs.Post.CreatePostRequest;
import api.szyszka.DTOs.Post.UpdatePostRequest;
import api.szyszka.Entities.*;
import api.szyszka.Repositories.PostRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Services.PostService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private UzytkownikRepository uzytkownikRepository;

    @InjectMocks
    private PostService postService;

    // ========= createPost =========
    @Test
    void shouldCreatePost() {
        CreatePostRequest req = new CreatePostRequest();
        req.setAutorId(1L);
        req.setTresc("test");

        Uzytkownik autor = new Uzytkownik();
        autor.setId(1L);

        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(autor));
        when(postRepository.save(any()))
                .thenAnswer(inv -> inv.getArgument(0));

        Post post = postService.createPost(req, List.of());

        assertThat(post.getAutor()).isEqualTo(autor);
    }

    // ========= getPostById =========
    @Test
    void shouldReturnPostById() {
        Post post = new Post();
        post.setId(1L);

        when(postRepository.findById(1L))
                .thenReturn(Optional.of(post));

        Post result = postService.getPostById(1L);

        assertThat(result).isEqualTo(post);
    }

    // ========= getPostsByUserId =========
    @Test
    void shouldReturnPostsByUserId() {
        when(postRepository.findByAutorId(1L))
                .thenReturn(List.of(new Post()));

        List<Post> result = postService.getPostsByUserId(1L);

        assertThat(result).hasSize(1);
    }

    // ========= getAllPosts =========
    @Test
    void shouldReturnAllPosts() {
        when(postRepository.findAll())
                .thenReturn(List.of(new Post(), new Post()));

        List<Post> result = postService.getAllPosts();

        assertThat(result).hasSize(2);
    }

    // ========= deletePostById =========
    @Test
    void shouldDeletePostById() {
        Post post = new Post();
        post.setZdjecia(List.of());

        when(postRepository.findById(1L))
                .thenReturn(Optional.of(post));

        postService.deletePostById(1L);

        verify(postRepository).delete(post);
    }

    // ========= modifyPostByPostId =========
    @Test
    void shouldModifyPostContent() {
        Post post = new Post();
        post.setTresc("old");

        when(postRepository.findById(1L))
                .thenReturn(Optional.of(post));
        when(postRepository.save(any()))
                .thenReturn(post);

        UpdatePostRequest req = new UpdatePostRequest();
        req.setTresc("new");

        Post result = postService.modifyPostByPostId(1L, req);

        assertThat(result.getTresc()).isEqualTo("new");
    }

    // ========= sharePost =========
    @Test
    void shouldSharePost() {
        Post post = new Post();
        post.setUdostepnienia(new java.util.ArrayList<>());

        Uzytkownik user = new Uzytkownik();
        user.setId(1L);

        when(postRepository.findById(1L))
                .thenReturn(Optional.of(post));
        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(user));
        when(postRepository.save(any()))
                .thenReturn(post);

        Post result = postService.sharePost(1L, 1L);

        assertThat(result.getUdostepnienia()).hasSize(1);
    }

    // ========= changeLike =========
    @Test
    void shouldAddLikeWhenNotExists() {
        Post post = new Post();
        post.setPolubienia(new java.util.ArrayList<>());

        Uzytkownik user = new Uzytkownik();
        user.setId(1L);

        when(postRepository.findById(1L))
                .thenReturn(Optional.of(post));
        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(user));
        when(postRepository.save(any()))
                .thenReturn(post);

        Post result = postService.changeLike(1L, 1L);

        assertThat(result.getPolubienia()).hasSize(1);
    }

    @Test
    void shouldRemoveLikeWhenExists() {
        Uzytkownik user = new Uzytkownik();
        user.setId(1L);

        Post_polubienia like = new Post_polubienia();
        like.setUzytkownik(user);

        Post post = new Post();
        post.setPolubienia(new java.util.ArrayList<>(List.of(like)));

        when(postRepository.findById(1L))
                .thenReturn(Optional.of(post));
        when(uzytkownikRepository.findById(1L))
                .thenReturn(Optional.of(user));
        when(postRepository.save(any()))
                .thenReturn(post);

        Post result = postService.changeLike(1L, 1L);

        assertThat(result.getPolubienia()).isEmpty();
    }
}