package api.szyszka.Mappers;

import api.szyszka.Entities.Uzytkownik;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UzytkownikShortcutMapper {
    public static Uzytkownik mapToPublic(Uzytkownik uzytkownik) {
        if (uzytkownik == null) return null;

        Uzytkownik publicUzytkownik = new Uzytkownik();
        publicUzytkownik.setId(uzytkownik.getId());
        publicUzytkownik.setImie(uzytkownik.getImie());
        publicUzytkownik.setNazwisko(uzytkownik.getNazwisko());
        return publicUzytkownik;
    }

    public static List<Uzytkownik> mapToPublicList(List<Uzytkownik> szostkaUsers) {
        if (szostkaUsers == null) return null;
        return szostkaUsers.stream()
                .map(UzytkownikShortcutMapper::mapToPublic)
                .collect(Collectors.toList());
    }
}
