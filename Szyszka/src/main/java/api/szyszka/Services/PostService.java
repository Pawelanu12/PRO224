package api.szyszka.Services;

import java.util.NoSuchElementException;
import java.util.Optional;
import api.szyszka.Entities.Post;
import api.szyszka.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post addPost(Post post) {
        return postRepository.save(post);
    }

    public void modifyPostByPostId(Long id, String tresc) {
        Post post = postRepository.findById(id).get();
        post.setTresc(tresc);
        postRepository.save(post);
    }

    public void deletePostByPostId(Long id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            postRepository.deleteById(id);
        }
        //else {new ResourceNotFoundException("Post not found ID: " + id);}
        else {throw new NoSuchElementException("Post not found by id: " + id);}
    }

    public void deletePostsByAuthorId(Long userId) {
        List<Post> posts = postRepository.findByAutorId(userId);

        if (!posts.isEmpty()) {
            postRepository.deleteAll(posts);
        }
        //else {new ResourceNotFoundException("Post not found ID: " + id);}
        else {throw new NoSuchElementException("Posts not found by author id: " + userId);}
    }

    public Post getPostById(Long id) {return postRepository.findById(id).get();}

    public List<Post> getPostsByUserId(Long userId) {return postRepository.findByAutorId(userId);}

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public void deletePostByUserId(Long userId) {postRepository.deleteById(userId);}



}