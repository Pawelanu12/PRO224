package org.example.mappers;
import org.example.DTOs.UzytkownikDTO;
import org.example.entities.Uzytkownik;

public class UzytkownikMapper {

    public static UzytkownikDTO toDTO(Uzytkownik uzytkownik) {
        if (uzytkownik == null) {
            return null;
        }

        UzytkownikDTO dto = new UzytkownikDTO();
        dto.setId(uzytkownik.getId());
        dto.setImie(uzytkownik.getImie());
        dto.setNazwisko(uzytkownik.getNazwisko());
        dto.setLogin(uzytkownik.getLogin());
        dto.setEmail(uzytkownik.getEmail());
        dto.setDataUrodzenia(uzytkownik.getDataUrodzenia());
        dto.setNrTelefonu(uzytkownik.getNrTelefonu());
        dto.setTypUzytkownika(uzytkownik.getTypUzytkownika());

        return dto;
    }

    public static Uzytkownik toEntity(UzytkownikDTO dto){

        if (dto == null) {
            return null;
        }

        Uzytkownik uzytkownik = new Uzytkownik(){
        };
        uzytkownik.setId(dto.getId());
        uzytkownik.setImie(dto.getImie());
        uzytkownik.setNazwisko(dto.getNazwisko());
        uzytkownik.setLogin(dto.getLogin());
        uzytkownik.setEmail(dto.getEmail());
        uzytkownik.setDataUrodzenia(dto.getDataUrodzenia());
        uzytkownik.setNrTelefonu(dto.getNrTelefonu());
        uzytkownik.setTypUzytkownika(dto.getTypUzytkownika());

        return uzytkownik;
    }
}
