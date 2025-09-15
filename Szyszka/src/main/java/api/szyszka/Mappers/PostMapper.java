package api.szyszka.Mappers;

import api.szyszka.DTOs.CreatePostRequest;
import api.szyszka.DTOs.PostDto;
import api.szyszka.Entities.Post;

public class PostMapper {

    public static PostDto toDto(Post entity) {
        if (entity == null) return null;
        return new PostDto(
                entity.getId(),
                entity.getDataStworzenia(),
                entity.getTresc(),
                entity.getIloscPolubien(),
                entity.getAutor().getId(),
                entity.getKomentarze(),
                entity.getZdjecia()
        );
    }

    public static Post fromCreateRequest(CreatePostRequest request) {
        if (request == null) return null;
        Post post = new Post();
        post.setDataStworzenia(request.getDataStworzenia());
        post.setTresc(request.getTresc());
        post.setIloscPolubien(request.getIloscPolubien());
        post.setAutor(request.getAutor());
        post.setKomentarze(request.getKomentarze());
        post.setZdjecia(request.getZdjecia());
        return post;
    }
}
