package api.szyszka.Mappers;

import api.szyszka.DTOs.CzatDto;
import api.szyszka.Entities.Czat;

public class CzatMapper {

    public static CzatDto toDto(Czat entity){
        if(entity == null) return null;
        return new CzatDto(
                entity.getId(),
                entity.getNazwa(),
                entity.isCzyGrupowy(),
                entity.getDataUtworzenia(),
                entity.getUczestnicy(),
                entity.getWiadomosci()
        );
    }
}
