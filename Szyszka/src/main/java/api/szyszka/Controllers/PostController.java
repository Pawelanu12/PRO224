package api.szyszka.Controllers;

import api.szyszka.DTOs.CreatePostRequest;
import api.szyszka.DTOs.PostDto;
import api.szyszka.DTOs.UpdatePostRequest;
import api.szyszka.Entities.Post;
import api.szyszka.Mappers.PostMapper;
import api.szyszka.Services.PostService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('RODZIC','DRUZYNOWY','PRZYBOCZNY', 'ZUCH')")
    public ResponseEntity<PostDto> createPost(
            @RequestParam(name = "tresc") String tresc,
            @RequestParam(name="autorId") Long autorId,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {
        CreatePostRequest request = new CreatePostRequest();
        request.setTresc(tresc);
        request.setAutorId(autorId);

        try {
            if (files != null && !files.isEmpty()) {
                String uploadDir = System.getProperty("user.dir") + File.separator + "post_uploads";
                File folder = new File(uploadDir);
                if (!folder.exists()) folder.mkdirs();

                for (MultipartFile file : files) {
                    if (file.isEmpty()) continue;

                    String time = System.currentTimeMillis() + "_";
                    String originalName = file.getOriginalFilename();
                    String cleanName = originalName.replaceAll("[^a-zA-Z0-9.\\-]", "_");

                    Path dest = Paths.get(uploadDir, time + cleanName);
                    Files.copy(file.getInputStream(), dest, StandardCopyOption.REPLACE_EXISTING);

                    request.getZdjecia().add(time + cleanName);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Błąd zapisu pliku: " + e.getMessage(), e);
        }

        request.setDataStworzenia(LocalDateTime.now());
        Post saved = postService.createPost(request, files);

        return ResponseEntity
                .created(URI.create("/api/posty/" + saved.getId()))
                .body(PostMapper.toDto(saved));
    }

    @GetMapping("/zdjecia/{fileName}")
    public ResponseEntity<Resource> getPostsByFilename(@PathVariable String filename) {
        try {
            String uploadDir = System.getProperty("user.dir") + "/post_uploads/";
            File file = new File(uploadDir + filename);

            if (!file.exists()) {
                System.out.println("Lack of file: " + file.getAbsolutePath());
                return ResponseEntity.notFound().build();
            }

            Resource resource = new FileSystemResource(file);

            String contentType = Files.probeContentType(file.toPath());
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
//    @PreAuthorize("hasAnyRole('DRUZYNOWY','PRZYBOCZNY')")
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

//    @DeleteMapping("/{id}")
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
