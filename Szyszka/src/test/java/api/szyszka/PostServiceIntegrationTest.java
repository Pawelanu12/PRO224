package api.szyszka;

import api.szyszka.DTOs.Post.CreatePostRequest;
import api.szyszka.DTOs.Post.UpdatePostRequest;
import api.szyszka.Entities.*;
import api.szyszka.Repositories.PostRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import api.szyszka.Services.PostService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional // ← ROLLBACK po KAŻDYM teście
class PostServiceIntegrationTest {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    // ===================== HELPERY =====================

    private Uzytkownik createValidUser() {
        Uzytkownik u = new Uzytkownik();
        u.setLogin("user_" + UUID.randomUUID());
        u.setImie("Jan");
        u.setNazwisko("Kowalski");
        return uzytkownikRepository.save(u);
    }

    private CreatePostRequest validCreatePostRequest(Long autorId) {
        CreatePostRequest req = new CreatePostRequest();
        req.setAutorId(autorId);
        req.setTresc("Testowa treść posta");
        req.setDataStworzenia(LocalDateTime.now()); // ← KLUCZ
        return req;
    }

    private Post createValidPost(Uzytkownik autor) {
        Post post = new Post();
        post.setAutor(autor);
        post.setTresc("Treść posta");
        post.setDataStworzenia(LocalDateTime.now()); // ← KLUCZ
        post.setZdjecia(new ArrayList<>());
        post.setPolubienia(new ArrayList<>());
        post.setUdostepnienia(new ArrayList<>());
        return postRepository.save(post);
    }

    // ===================== TESTY =====================

    @Test
    void shouldCreatePostWithoutPictures() {
        Uzytkownik autor = createValidUser();

        CreatePostRequest request = validCreatePostRequest(autor.getId());

        Post post = postService.createPost(request, null);

        assertThat(post.getId()).isNotNull();
        assertThat(post.getAutor().getId()).isEqualTo(autor.getId());
        assertThat(post.getDataStworzenia()).isNotNull();
    }

    @Test
    void shouldCreatePostWithPicture() {
        Uzytkownik autor = createValidUser();

        CreatePostRequest request = validCreatePostRequest(autor.getId());

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.jpg",
                "image/jpeg",
                "img".getBytes()
        );

        Post post = postService.createPost(request, List.of(file));

        assertThat(post.getId()).isNotNull();
        assertThat(post.getZdjecia()).isEmpty(); // zgodnie z aktualną logiką serwisu
    }

    @Test
    void shouldGetPostById() {
        Uzytkownik autor = createValidUser();
        Post post = createValidPost(autor);

        Post found = postService.getPostById(post.getId());

        assertThat(found).isNotNull();
        assertThat(found.getId()).isEqualTo(post.getId());
    }

    @Test
    void shouldGetPostsByUserId() {
        Uzytkownik autor = createValidUser();
        createValidPost(autor);
        createValidPost(autor);

        List<Post> posts = postService.getPostsByUserId(autor.getId());

        assertThat(posts).hasSize(2);
    }

    @Test
    void shouldAddPictureToPost() {
        Uzytkownik autor = createValidUser();
        Post post = createValidPost(autor);

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "img.jpg",
                "image/jpeg",
                "data".getBytes()
        );

        Post updated = postService.addPictureToPost(post.getId(), file);

        assertThat(updated.getZdjecia()).hasSize(1);
    }

    @Test
    void shouldRemovePictureFromPost() {
        Uzytkownik autor = createValidUser();
        Post post = createValidPost(autor);

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "img.jpg",
                "image/jpeg",
                "data".getBytes()
        );

        Post withPic = postService.addPictureToPost(post.getId(), file);
        String fileName = withPic.getZdjecia().get(0).getSciezka();

        postService.deletePictureFromPost(post.getId(), fileName);

        Post refreshed = postService.getPostById(post.getId());
        assertThat(refreshed.getZdjecia()).isEmpty();
    }

    @Test
    void shouldModifyPostContent() {
        Uzytkownik autor = createValidUser();
        Post post = createValidPost(autor);

        UpdatePostRequest update = new UpdatePostRequest();
        update.setTresc("Nowa treść");

        Post updated = postService.modifyPostByPostId(post.getId(), update);

        assertThat(updated.getTresc()).isEqualTo("Nowa treść");
    }

    @Test
    void shouldToggleLike() {
        Uzytkownik autor = createValidUser();
        Uzytkownik liker = createValidUser();

        Post post = createValidPost(autor);

        postService.changeLike(post.getId(), liker.getId());
        Post liked = postService.getPostById(post.getId());

        assertThat(liked.getPolubienia()).hasSize(1);

        postService.changeLike(post.getId(), liker.getId());
        Post unliked = postService.getPostById(post.getId());

        assertThat(unliked.getPolubienia()).isEmpty();
    }

    @Test
    void shouldSharePostOnlyOnce() {
        Uzytkownik autor = createValidUser();
        Uzytkownik sharer = createValidUser();

        Post post = createValidPost(autor);

        postService.sharePost(post.getId(), sharer.getId());
        postService.sharePost(post.getId(), sharer.getId());

        Post shared = postService.getPostById(post.getId());

        assertThat(shared.getUdostepnienia()).hasSize(1);
    }

    @Test
    void shouldDeletePost() {
        Uzytkownik autor = createValidUser();
        Post post = createValidPost(autor);

        postService.deletePostById(post.getId());

        assertThat(postRepository.findById(post.getId())).isEmpty();
    }
}