package org.example.DTOs;
import lombok.Data;

import java.util.List;
@Data
public class RodzicDTO extends UzytkownikDTO {
    private List<Long> dzieciJakoRodzic;
}
