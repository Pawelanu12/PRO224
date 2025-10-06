package api.szyszka.Controllers;

import api.szyszka.DTOs.CreatePostRequest;
import api.szyszka.DTOs.PostDto;
import api.szyszka.DTOs.UpdatePostRequest;
import api.szyszka.Entities.Post;
import api.szyszka.Mappers.PostMapper;
import api.szyszka.Services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/posty")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {this.postService = postService;} //Wystarczy id użytkownika

//    @PostMapping
//    public ResponseEntity<PostDto> createPost(@RequestBody CreatePostRequest request) {
//        Post post = PostMapper.fromCreateRequest(request);
//        Post saved = postService.createPost(post);
//
//        return ResponseEntity
//                .created(URI.create("/api/posty/" + saved.getId()))
//                .body(PostMapper.toDto(saved));
//    }

    @PostMapping
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY', 'ZUCH')")
    public ResponseEntity<PostDto> createPost(@RequestBody CreatePostRequest request) {
        Post saved = postService.createPost(request);

        return ResponseEntity
                .created(URI.create("/api/posty/" + saved.getId()))
                .body(PostMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY', 'ZUCH')")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(PostMapper.toDto(post));
    }

   @GetMapping("/posts/{id}")
   @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY', 'ZUCH')")
   public ResponseEntity<List<PostDto>> getPostsByAuthorId(@PathVariable Long id) {
        List<PostDto> posts = postService.getPostsByUserId(id)
                .stream()
                .map(PostMapper::toDto)
                .toList();
        return ResponseEntity.ok(posts);
   }

    @GetMapping
    @PreAuthorize("hasAnyRole('DRUZYNOWY','PRZYBOCZNY')")
    public ResponseEntity<List<PostDto>> getAllPosts() {
        List<PostDto> posts = postService.getAllPosts()
                .stream()
                .map(PostMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(posts);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY', 'ZUCH')")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePostById(id);
        return ResponseEntity.noContent().build();
    }

//    @DeleteMapping("/posts/{id}")
//    public ResponseEntity<Void> deletePostsByAuthorId(@PathVariable Long id) {
//        postService.deletePostById(id);
//        return ResponseEntity.noContent().build();
//    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@PathVariable Long id,
                                              @RequestBody UpdatePostRequest request) {
        Post oldPost = postService.getPostById(id);

        PostMapper.updateEntity(oldPost, request);
        Post update = postService.modifyPostByPostId(id, oldPost);

        return ResponseEntity.ok(PostMapper.toDto(update));
    }


}
