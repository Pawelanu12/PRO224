package api.szyszka.DTOs.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangeParentsRequest {
    private Long parentId1;
    private Long parentId2;
}
