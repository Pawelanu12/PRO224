package org.example.DTOs;

import lombok.Data;
import org.example.DTOs.UzytkownikDTO;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class ZuchDTO extends UzytkownikDTO {
    private LocalDateTime dataDolaczeniaDoGromady;
    private Long szostkaId;
    private List<Long> rodzicIds;
    private List<Long> zdobyteSprawnosciIds;

}
