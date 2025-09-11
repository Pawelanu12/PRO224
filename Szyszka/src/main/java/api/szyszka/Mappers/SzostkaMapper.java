package api.szyszka.Mappers;


import api.szyszka.DTOs.CreateSzostkaRequest;
import api.szyszka.DTOs.SzostkaDto;
import api.szyszka.Entities.Szostka;

public class SzostkaMapper {

    public static SzostkaDto toDto(Szostka entity) {
        if (entity == null) return null;
        return new SzostkaDto(
                entity.getId(),
                entity.getNazwa(),
                entity.getDataStworzenia(),
                entity.getUzytkownicy()

        );
    }

    public static Szostka fromCreateRequest(CreateSzostkaRequest request){
        if (request == null) return null;
        Szostka szostka = new Szostka();
        szostka.setNazwa(request.getNazwa());
        szostka.setDataStworzenia(request.getDataStworzenia());
        szostka.setUzytkownicy(request.getUzytkonicy());
        return szostka;
    }
}
