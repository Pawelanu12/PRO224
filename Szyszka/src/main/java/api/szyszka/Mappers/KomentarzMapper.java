package api.szyszka.Mappers;

import api.szyszka.DTOs.Post.CreateKomentarzRequest;
import api.szyszka.DTOs.Post.KomentarzDto;
import api.szyszka.DTOs.Post.UpdateKomentarzRequest;
import api.szyszka.Entities.Komentarz;

public class KomentarzMapper {

    public static KomentarzDto toDto(Komentarz entity){
        if(entity == null) return null;
        return new KomentarzDto(
                entity.getId(),
                entity.getDataStworzenia(),
                entity.getTresc(),
                entity.getPost().getId(),
                entity.getAutor().getId()
        );
    }

    public static Komentarz fromCreateRequest(CreateKomentarzRequest request){
        if(request == null) return null;
        Komentarz komentarz = new Komentarz();
        komentarz.setDataStworzenia(request.getDataStworzenia());
        komentarz.setTresc(request.getTresc());

        return komentarz;
    }

    public static void updateEntity( Komentarz entity, UpdateKomentarzRequest request){
        if(entity == null || request == null) return;
        entity.setDataStworzenia(request.getDataStworzenia());
        entity.setTresc(request.getTresc());
    }
}
