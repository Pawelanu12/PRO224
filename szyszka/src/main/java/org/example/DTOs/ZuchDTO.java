package org.example.DTOs;

import jakarta.persistence.*;
import lombok.Data;
import org.example.entities.Szostka;
import org.example.entities.Uzytkownik;
import org.example.entities.ZdobyteSprawnosci;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ZuchDTO extends UzytkownikDTO{
    private LocalDateTime dataDolaczeniaDoGromady;

    private Long szostkaid;

    private Long rodzic1id;

    private Long rodzic2id;

    private List<ZdobyteSprawnosciDTO> zdobyteSprawnosci;

}
