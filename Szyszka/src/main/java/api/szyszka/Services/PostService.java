package api.szyszka.Services;

import api.szyszka.DTOs.CreatePostRequest;
import api.szyszka.Entities.Post;
import api.szyszka.Entities.Uzytkownik;
import api.szyszka.Mappers.PostMapper;
import api.szyszka.Repositories.PostRepository;
import api.szyszka.Repositories.UzytkownikRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Post createPost(CreatePostRequest request) {
        Post post = PostMapper.fromCreateRequest(request);

        Uzytkownik autor = uzytkownikRepository.findById(request.getAutorId())
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o id: " + request.getAutorId()));

        post.setAutor(autor); // <-- KLUCZ

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

    public void deletePostById(Long postId) {
        if (postRepository.existsById(postId)) {
            postRepository.deleteById(postId);
        }
    }

    public Post modifyPostByPostId(Long id, Post updatePost) {
        Post oldPost = getPostById(id);

        //if (!oldSzostka.getNazwa().equals(updateSzostka.getNazwa())
        //        && szostkaRepository.findByNazwa(updateSzostka.getNazwa()).isPresent()) {
        //    throw new DuplicateSzostkaException(updateSzostka.getNazwa());
        //}

        oldPost.setDataStworzenia(updatePost.getDataStworzenia());
        oldPost.setTresc(updatePost.getTresc());
        oldPost.setIloscPolubien(updatePost.getIloscPolubien());
        oldPost.setAutor(updatePost.getAutor());
        //oldPost.setKomentarze(updatePost.getKomentarze());
        //oldPost.setZdjecia(updatePost.getZdjecia());

        return postRepository.save(oldPost);
    }


}