package api.szyszka.Services;

import api.szyszka.DTOs.CreatePostRequest;
import api.szyszka.Entities.Post;
import api.szyszka.Entities.PostZdjecie;
import api.szyszka.Entities.Post_polubienia;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Mappers.PostMapper;
import api.szyszka.Repositories.PostRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UzytkownikRepository uzytkownikRepository;

//    public PostService(PostRepository postRepository) {
//        this.postRepository = postRepository;
//    }

    public PostService(PostRepository postRepository, UzytkownikRepository uzytkownikRepository) {
        this.postRepository = postRepository;
        this.uzytkownikRepository = uzytkownikRepository;
    }

    private PostZdjecie saveFileForPost(MultipartFile file, Post post) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get("post_uploads/" + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            PostZdjecie zdj = new PostZdjecie();
            zdj.setSciezka(fileName);
            zdj.setPost(post);

            return zdj;

        } catch (Exception e) {
            throw new RuntimeException("Nie udało się zapisać pliku posta: " + e.getMessage(), e);
        }
    }

    public Post createPost(CreatePostRequest request, List<MultipartFile> files) {
        Post post = PostMapper.fromCreateRequest(request);

        Uzytkownik autor = uzytkownikRepository.findById(request.getAutorId())
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o id: " + request.getAutorId()));

        post.setAutor(autor); // <-- KLUCZ

//        return postRepository.save(post);

        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                //System.out.println(file.getOriginalFilename());
                PostZdjecie zdj = saveFileForPost(file, post);
                post.getZdjecia().add(zdj);
            }
        }

        return postRepository.save(post);
    }

    //public Post createPost(Post post) {return postRepository.save(post);}

//    public void modifyPostByPostId(Long id, String tresc) {
//        Post post = postRepository.findById(id).get();
//        post.setTresc(tresc);
//        postRepository.save(post);
//    }

//    public void deletePostsByAuthorId(Long userId) {
//        List<Post> posts = postRepository.findByAutorId(userId);
//
//        if (!posts.isEmpty()) {
//            postRepository.deleteAll(posts);
//        }
//        //else {new ResourceNotFoundException("Post not found ID: " + id);}
//        else {throw new NoSuchElementException("Posts not found by author id: " + userId);}
//    }

    public Post getPostById(Long id) {return postRepository.findById(id).get();}

    public List<Post> getPostsByUserId(Long userId) {return postRepository.findByAutorId(userId);}

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    //public void deletePostById(Long postId) {
    //    if (postRepository.existsById(postId)) {
    //        postRepository.deleteById(postId);
    //    }
    //}

    public void deletePostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post doesn't exist"));

        if (!post.getZdjecia().isEmpty()) {
            for (PostZdjecie zdj : post.getZdjecia()) {
                removeFileFromDisk(zdj.getSciezka());
            }
        }

        postRepository.delete(post);
    }

    public Post modifyPostByPostId(Long id, Post updatePost) {
        Post oldPost = getPostById(id);

        //if (!oldSzostka.getNazwa().equals(updateSzostka.getNazwa())
        //        && szostkaRepository.findByNazwa(updateSzostka.getNazwa()).isPresent()) {
        //    throw new DuplicateSzostkaException(updateSzostka.getNazwa());
        //}

        oldPost.setDataStworzenia(updatePost.getDataStworzenia());
        oldPost.setTresc(updatePost.getTresc());
        oldPost.setPolubienia(updatePost.getPolubienia());
        oldPost.setAutor(updatePost.getAutor());
        //oldPost.setKomentarze(updatePost.getKomentarze());
        //oldPost.setZdjecia(updatePost.getZdjecia());

        return postRepository.save(oldPost);
    }


    public Post changeLike(Long postId, Long uzytkownikId) {

        Post post = getPostById(postId);
        Uzytkownik uzytkownik = uzytkownikRepository.findById(uzytkownikId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));

        Optional<Post_polubienia> existingLike = post.getPolubienia().stream()
                .filter(p -> p.getUzytkownik() != null)
                .filter(p -> Objects.equals(p.getUzytkownik().getId(), uzytkownikId))
                .findFirst();

        if (existingLike.isPresent()) {
            post.getPolubienia().remove(existingLike.get());
        } else {
            Post_polubienia like = new Post_polubienia();
            like.setPost(post);
            like.setUzytkownik(uzytkownik);
            post.getPolubienia().add(like);
        }

        return postRepository.save(post);
    }

    private void removeFileFromDisk(String path) {
        try {
            Files.deleteIfExists(Paths.get("post_uploads/", path));
        } catch (IOException e) {
            throw new RuntimeException("Nie udało się usunąć pliku: " + path, e);
        }
    }
}