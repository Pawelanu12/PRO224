//package api.szyszka.Controllers;
//
//import api.szyszka.DTOs.CreateCzatRequest;
//import api.szyszka.DTOs.CreateWydarzenieRequest;
//import api.szyszka.DTOs.CzatDto;
//import api.szyszka.Entities.Czat;
//import api.szyszka.Mappers.CzatMapper;
//import api.szyszka.Services.CzatService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.net.URI;
//
//@RestController
//@RequestMapping("/api/czat")
//public class CzatController {
//
//    private final CzatService czatService;
//
//    public CzatController(CzatService czatService) {
//        this.czatService = czatService;
//    }
//
//    @PostMapping
//    public ResponseEntity<CzatDto> createCzat(@RequestBody CreateCzatRequest request) {
//        Czat saved = czatService.createChat(request);
//
//        return ResponseEntity
//                .created(URI.create("/api/czat/" + saved.getId()))
//                .body(CzatMapper.toDto(saved));
//    }
//}
