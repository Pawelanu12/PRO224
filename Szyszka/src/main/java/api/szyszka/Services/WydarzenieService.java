package api.szyszka.Services;


import api.szyszka.Entities.Wydarzenie;
import api.szyszka.Repositories.SprawnoscRepository;
import api.szyszka.Repositories.WydarzenieRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class WydarzenieService {

    private final WydarzenieRepository wydarzenieRepository;
    private final SprawnoscRepository sprawnoscRepository;

    public WydarzenieService(WydarzenieRepository wydarzenieRepository, SprawnoscRepository sprawnoscRepository) {
        this.wydarzenieRepository = wydarzenieRepository;
        this.sprawnoscRepository = sprawnoscRepository;
    }

    public Wydarzenie createWydarzenie(Wydarzenie wydarzenie) {return wydarzenieRepository.save(wydarzenie);}

    public List<Wydarzenie> getAllWydarzenia() {return wydarzenieRepository.findAll();}

    public Wydarzenie getWydarzenieById(long id) {return wydarzenieRepository.findById(id).get();}

    public Wydarzenie getWydarzenieByNazwa(String nazwa) {
        return wydarzenieRepository.findByNazwa(nazwa).get();
    }

    public Wydarzenie getWydarzenieByDataWyjazdu(LocalDateTime dataWyjazdu) {
        return wydarzenieRepository.findByDataWyjazdu(dataWyjazdu).get();
    }

    public Wydarzenie getWydarzenieByDataZakonczenia(LocalDateTime dataZaonczenia) {
        return wydarzenieRepository.findByDataZakonczenia(dataZaonczenia).get();
    }

    public List<Wydarzenie> getWyjazduByDateRange(LocalDateTime dataPierwsza, LocalDateTime dataDruga) {
        return wydarzenieRepository.findByDataWyjazduBetween(dataPierwsza, dataDruga);
    }

    public List<Wydarzenie> getPrzyjazduByDateRange(LocalDateTime dataPierwsza, LocalDateTime dataDruga) {
        return wydarzenieRepository.findByDataZakonczeniaBetween(dataPierwsza, dataDruga);
    }

    public void deleteWydarzenie(long id) {sprawnoscRepository.deleteById(id);}

     public Wydarzenie modifyWydarzenie(Long id, Wydarzenie updateWydarzenie) {
        Wydarzenie oldWydarzenie = getWydarzenieById(id);

        if (!oldWydarzenie.getNazwa().equals(updateWydarzenie.getNazwa())
                && wydarzenieRepository.existsById(id)) {
            throw new NoSuchElementException();
        }

        oldWydarzenie.setNazwa(updateWydarzenie.getNazwa());
        oldWydarzenie.setDataWyjazdu(updateWydarzenie.getDataWyjazdu());
        oldWydarzenie.setDataZakonczenia(updateWydarzenie.getDataZakonczenia());
        oldWydarzenie.setOpis(updateWydarzenie.getOpis());
        oldWydarzenie.setOrganizator(updateWydarzenie.getOrganizator());
        oldWydarzenie.setUczestnictwa(updateWydarzenie.getUczestnictwa());
        oldWydarzenie.setZdjecia(updateWydarzenie.getZdjecia());


        return wydarzenieRepository.save(oldWydarzenie);
//        Optional<Wydarzenie> oldWydarzenie = wydarzenieRepository.findById(id);
//
//        if (oldWydarzenie.isPresent()){
//            Wydarzenie wydarzenie = oldWydarzenie.get();
//            wydarzenie.setNazwa(updateWydarzenie.getNazwa());
//            wydarzenie.setDataWyjazdu(updateWydarzenie.getDataWyjazdu());
//            wydarzenie.setDataZakonczenia(updateWydarzenie.getDataZakonczenia());
//            wydarzenie.setOpis(updateWydarzenie.getOpis());
//            wydarzenie.setOrganizator(updateWydarzenie.getOrganizator());
//            wydarzenie.setUczestnictwa(updateWydarzenie.getUczestnictwa());
//            wydarzenie.setZdjecia(updateWydarzenie.getZdjecia());
//            wydarzenieRepository.save(wydarzenie);
//         }
//        else {
//            throw new NoSuchElementException("Wydarzenie not found by id: " + id);
//        }
     }




}
