//package api.szyszka.Services;
//
//import api.szyszka.DTOs.CreateSprawnoscRequest;
//import api.szyszka.Entities.Sprawnosc;
//import api.szyszka.Entities.Uzytkownik;
//import api.szyszka.Entities.ZdobyteSprawnosci;
//import api.szyszka.Repositories.SprawnoscRepository;
//import api.szyszka.Repositories.UzytkownikRepository;
//import api.szyszka.Repositories.ZdobyteSprawnosciRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.NoSuchElementException;
//
//@Service
//public class ZdobytaSprawnoscService {
//    private final ZdobyteSprawnosciRepository zdobytaSprawnoscRepository;
//    private final UzytkownikRepository uzytkownikRepository;
//    private final SprawnoscRepository sprawnoscRepository;
//
//    public ZdobytaSprawnoscService(ZdobyteSprawnosciRepository zdobytaSprawnoscRepository,
//                                   UzytkownikRepository uzytkownikRepository, SprawnoscRepository sprawnoscRepository) {
//        this.zdobytaSprawnoscRepository = zdobytaSprawnoscRepository;
//        this.uzytkownikRepository = uzytkownikRepository;
//        this.sprawnoscRepository = sprawnoscRepository;
//    }
//
//    public ZdobyteSprawnosci createZdobytaSprawnosc(CreateSprawnoscRequest request) {
//        ZdobyteSprawnosci zdobytaSprawnosc = ZdobytaSprawnoscMapper.fromCreateRequest(request);
//
//        Uzytkownik uzytkownik = uzytkownikRepository.findById(request.getUzytkownikId())
//                .orElseThrow(() -> new NoSuchElementException("uzytkownik nie znaleziony"));
//        zdobytaSprawnosc.setUzytkownik(uzytkownik);
//        Sprawnosc sprawnosc = sprawnoscRepository.findById(request.getSprawnoscId())
//                .orElseThrow(() -> new NoSuchElementException("sprawnosc nie znaleziona"));
//        zdobytaSprawnosc.setSprawnosc(sprawnosc);
//
//        return zdobytaSprawnoscRepository.save(zdobytaSprawnosc);
//    }
//}
