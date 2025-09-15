package api.szyszka.DTOs;

import lombok.Data;
import java.util.List;

@Data
public class CreateCzatRequest {
    private String nazwa;
    private boolean isGroup;
    private List<Long> userIds;
}
