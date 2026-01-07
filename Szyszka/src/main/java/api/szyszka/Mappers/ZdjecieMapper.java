package api.szyszka.Mappers;

import api.szyszka.DTOs.Images.CreateZdjecieRequest;
import api.szyszka.DTOs.Images.UpdateZdjecieRequest;
import api.szyszka.DTOs.Images.ZdjecieDto;
import api.szyszka.Entities.Zdjecie;

public class ZdjecieMapper {

    public static ZdjecieDto toDto(Zdjecie entity) {
        if (entity == null) return null;
        return new ZdjecieDto(
                entity.getId(),
                entity.getSciezka(),
                entity.getPost() != null ? entity.getPost().getId() : null,
                entity.getWydarzenie() != null ? entity.getWydarzenie().getId() : null,
                entity.getUzytkownik() != null ? entity.getUzytkownik().getId() : null
//                entity.getPost().getId(),
//                entity.getWydarzenie().getId(),
//                entity.getUzytkownik().getId()
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
