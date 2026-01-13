package api.szyszka.Mappers;

import api.szyszka.DTOs.User.CreateUzytkownikRequest;
import api.szyszka.DTOs.User.UpdateMyProfileRequest;
import api.szyszka.DTOs.User.UpdateUserByAdminRequest;
import api.szyszka.DTOs.User.UzytkownikDto;
import api.szyszka.Entities.TypUzytkownika;
import api.szyszka.Entities.Uzytkownik;

public class UzytkownikMapper {

    public static UzytkownikDto toDto(Uzytkownik u) {
        if (u == null) return null;

        return new UzytkownikDto(
                u.getId(),
                u.getImie(),
                u.getNazwisko(),
                u.getLogin(),
                u.getEmail(),
                u.getNrTelefonu(),
                u.getTypUzytkownika() != null ? u.getTypUzytkownika().name() : null
        );
    }
    public static Uzytkownik fromCreateRequest(CreateUzytkownikRequest r) {
        if (r == null) return null;

        Uzytkownik u = new Uzytkownik();
        u.setImie(r.getImie());
        u.setNazwisko(r.getNazwisko());
        u.setLogin(r.getLogin());
        u.setHaslo(r.getHaslo());
        u.setEmail(r.getEmail());
        u.setNrTelefonu(r.getNrTelefonu());

        u.setTypUzytkownika(
                r.getTypUzytkownika() != null
                        ? TypUzytkownika.valueOf(r.getTypUzytkownika().toUpperCase())
                        : TypUzytkownika.DEFAULT
        );

        return u;
    }

    public static void updateMyProfile(Uzytkownik u, UpdateMyProfileRequest r) {
        if (u == null || r == null) return;

        if (r.getImie() != null) u.setImie(r.getImie());
        if (r.getNazwisko() != null) u.setNazwisko(r.getNazwisko());
        if (r.getEmail() != null) u.setEmail(r.getEmail());
        if (r.getNrTelefonu() != null) u.setNrTelefonu(r.getNrTelefonu());
        if (r.getLogin() != null) u.setLogin(r.getLogin());
    }

    public static void updateByAdmin(Uzytkownik u, UpdateUserByAdminRequest r) {
        if (u == null || r == null) return;

        if (r.getImie() != null) u.setImie(r.getImie());
        if (r.getNazwisko() != null) u.setNazwisko(r.getNazwisko());
        if (r.getEmail() != null) u.setEmail(r.getEmail());
        if (r.getNrTelefonu() != null) u.setNrTelefonu(r.getNrTelefonu());
    }
}
