package api.szyszka.Services;

import api.szyszka.Entities.Post;
import api.szyszka.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post addPost(Post post) {
        return postRepository.save(post);
    }

    public void deletePostByPostId(Long id) {
        postRepository.deleteById(id);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {return postRepository.findById(id).get();}

    public List<Post> getPostsByUserId(Long userId) {return postRepository.findByAutorId(userId);}

    public void deletePostByUserId(Long userId) {postRepository.deleteById(userId);}

//    public void modifyPostByPostId(Long id) {
//        Post post = postRepository.findById(id).get();
//        post.setTresc();
//    }


}
