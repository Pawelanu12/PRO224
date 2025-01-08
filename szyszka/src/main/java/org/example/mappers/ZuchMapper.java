package org.example.mappers;
import org.example.DTOs.UzytkownikDTO;
import org.example.DTOs.ZuchDTO;
import org.example.entities.Uzytkownik;
import org.example.entities.Zuch;

public class ZuchMapper {

    public static ZuchDTO toDTO(Zuch zuch) {
        if (zuch == null) {
            return null;
        }

        ZuchDTO dto = new ZuchDTO();
        dto.setId(zuch.getId());
        dto.setImie(zuch.getImie());
        dto.setNazwisko(zuch.getNazwisko());
        dto.setLogin(zuch.getLogin());
        dto.setEmail(zuch.getEmail());
        dto.setDataUrodzenia(zuch.getDataUrodzenia());
        dto.setNrTelefonu(zuch.getNrTelefonu());
        dto.setTypUzytkownika(zuch.getTypUzytkownika());

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
