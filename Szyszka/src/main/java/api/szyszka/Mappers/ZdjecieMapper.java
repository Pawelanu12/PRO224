package api.szyszka.Mappers;

import api.szyszka.DTOs.CreateZdjecieRequest;
import api.szyszka.DTOs.PostDto;
import api.szyszka.DTOs.UpdateZdjecieRequest;
import api.szyszka.DTOs.ZdjecieDto;
import api.szyszka.Entities.Zdjecie;

public class ZdjecieMapper {

    public static ZdjecieDto toDto(Zdjecie entity) {
        if (entity == null) return null;
        return new ZdjecieDto(
                entity.getId(),
                entity.getSciezka(),
                entity.getPost().getId(),
                entity.getWydarzenie().getId(),
                entity.getUzytkownik().getId()
        );
    }

    public static Zdjecie fromCreateRequest(CreateZdjecieRequest request) {
        if (request == null) return null;
        Zdjecie zdjecie = new Zdjecie();
        zdjecie.setSciezka(request.getSciezka());
        return zdjecie;
    }

    public static void updateEntity(Zdjecie entity, UpdateZdjecieRequest request) {
        if (request == null || entity == null) return;
        entity.setSciezka(request.getSciezka());
    }
}
