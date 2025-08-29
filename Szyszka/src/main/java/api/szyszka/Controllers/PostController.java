package api.szyszka.Controllers;

import api.szyszka.DTOs.CreatePostRequest;
import api.szyszka.DTOs.PostDto;
import api.szyszka.Entities.Post;
import api.szyszka.Mappers.PostMapper;
import api.szyszka.Services.PostService;
import api.szyszka.Services.UzytkownikService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posty")
public class PostController {

    private final PostService postService;
    private final UzytkownikService uzytkownikService;

    public PostController(PostService postService, UzytkownikService uzytkownikService) {this.postService = postService;
        this.uzytkownikService = uzytkownikService;
    }

    @PostMapping
    public ResponseEntity<PostDto> createPost(@RequestBody CreatePostRequest request) {
        Post post = PostMapper.fromCreateRequest(request);
        Post saved = postService.createPost(post);

        return ResponseEntity
                .created(URI.create("/api/posty/" + saved.getId()))
                .body(PostMapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(PostMapper.toDto(post));
    }

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts() {
        List<PostDto> posts = postService.getAllPosts()
                .stream()
                .map(PostMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(posts);
    }
}
