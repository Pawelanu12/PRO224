package api.szyszka.Mappers;

import api.szyszka.DTOs.CreateKomentarzRequest;
import api.szyszka.DTOs.KomentarzDto;
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
        komentarz.setDataStworzenia(request.getDataStwprzenia());
        komentarz.setTresc(request.getTresc());

        return komentarz;
    }
}
