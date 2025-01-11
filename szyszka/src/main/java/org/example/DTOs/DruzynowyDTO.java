package org.example.DTOs;

import lombok.Data;

import java.util.List;
@Data
public class DruzynowyDTO extends UzytkownikDTO {
    private String nazwaDruzyny;
    private List<Long> zuchyIds;
}
