package api.szyszka.Mappers;

import api.szyszka.DTOs.User.CreateUzytkownikRequest;
import api.szyszka.DTOs.User.UpdateUzytkownikRequest;
import api.szyszka.DTOs.User.UzytkownikDto;
import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;

public class UzytkownikMapper {

    public static UzytkownikDto toDto(Uzytkownik entity) {
        if (entity == null) return null;
        return new UzytkownikDto(
                entity.getId(),
                entity.getImie(),
                entity.getNazwisko(),
                entity.getLogin(),
                entity.getEmail(),
                entity.getNrTelefonu(),
                entity.getTypUzytkownika()
        );
    }

    public static Uzytkownik fromCreateRequest(CreateUzytkownikRequest request) {
        if (request == null) return null;
        Uzytkownik user = new Uzytkownik();
        user.setImie(request.getImie());
        user.setNazwisko(request.getNazwisko());
        user.setLogin(request.getLogin());
        user.setHaslo(request.getHaslo());
        user.setEmail(request.getEmail());
        user.setNrTelefonu(request.getNrTelefonu());
        user.setTypUzytkownika(
                request.getTypUzytkownika() != null
                        ? TypUzytkownika.valueOf((request.getTypUzytkownika()))
                        : TypUzytkownika.DEFAULT
        );

        return user;
    }

    public static void updateEntity(Uzytkownik entity, UpdateUzytkownikRequest request) {
        if (request == null || entity == null) return;
        entity.setImie(request.getImie());
        entity.setNazwisko(request.getNazwisko());
        entity.setEmail(request.getEmail());
        entity.setNrTelefonu(request.getNrTelefonu());
        entity.setTypUzytkownika(
                request.getTypUzytkownika() != null
                        ? TypUzytkownika.valueOf(request.getTypUzytkownika())
                        : entity.getTypUzytkownika()
        );

    }
}
