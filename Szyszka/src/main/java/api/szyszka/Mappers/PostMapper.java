package api.szyszka.Mappers;

import api.szyszka.DTOs.CreatePostRequest;
import api.szyszka.DTOs.PostDto;
import api.szyszka.DTOs.UpdatePostRequest;
import api.szyszka.Entities.Post;
import api.szyszka.Entities.Zdjecie;

import java.util.ArrayList;
import java.util.stream.Collectors;

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
                //entity.getZdjecia().stream()
                //        .map(entity.getZdjecia()::mapToPublic)
                //        .collect(Collectors.toList())
                //entity.getUzytkownicy().stream()
                //        .map(UzytkownikShortcutMapper::mapToPublic)
                //        .collect(Collectors.toList())
        );
    }

    public static Post fromCreateRequest(CreatePostRequest request) {
        if (request == null) return null;
        Post post = new Post();
        post.setDataStworzenia(request.getDataStworzenia());
        post.setTresc(request.getTresc());
        post.setIloscPolubien(request.getIloscPolubien());
        //post.setAutor(request.getAutor());
        //post.setKomentarze(request.getKomentarze());
        //post.setZdjecia(request.getZdjecia());
        return post;
    }

    public static void updateEntity(Post entity, UpdatePostRequest request) {
        if (request == null || entity == null) return;
        entity.setDataStworzenia(request.getDataStworzenia());
        entity.setTresc(request.getTresc());
        entity.setIloscPolubien(request.getIloscPolubien());
        //entity.setAutor(request.getAutor());
        //entity.setKomentarze(request.getKomentarze());
        //entity.setKomentarze(
        //        request.getKomentarze() != null ? request.getKomentarze() : new ArrayList<>()
        //);
        //entity.setZdjecia(request.getZdjecia());
        //entity.setZdjecia(
        //        request.getZdjecia() != null ? request.getZdjecia() : new ArrayList<>()
        //);
    }
}
