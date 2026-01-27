package api.szyszka;

import api.szyszka.Entities.Szostka;
import api.szyszka.Exceptions.DuplicateSzostkaException;
import api.szyszka.Repositories.SzostkaRepository;
import api.szyszka.Services.SzostkaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class SzostkaServiceIntegrationTest {

    @Autowired
    private SzostkaService szostkaService;

    @Autowired
    private SzostkaRepository szostkaRepository;

    // =====================================================
    // ================= METODY POMOCNICZE =================
    // =====================================================

    private Szostka createSzostka(String nazwa) {
        Szostka s = new Szostka();
        s.setNazwa(nazwa);
        s.setDataStworzenia(LocalDateTime.now());
        return szostkaRepository.save(s);
    }

    // =====================================================
    // ======================= TESTY =======================
    // =====================================================

    @Test
    void shouldCreateSzostka() {
        Szostka szostka = new Szostka();
        szostka.setNazwa("Sokoły");
        szostka.setDataStworzenia(LocalDateTime.now());

        Szostka result = szostkaService.create(szostka);

        assertThat(result.getId()).isNotNull();
        assertThat(result.getNazwa()).isEqualTo("Sokoły");
    }

    @Test
    void shouldGetSzostkaById() {
        Szostka saved = createSzostka("Wilki");

        Szostka fetched = szostkaService.getSzostkaById(saved.getId());

        assertThat(fetched.getId()).isEqualTo(saved.getId());
    }

    @Test
    void shouldReturnAllSzostki() {
        createSzostka("Lwy");
        createSzostka("Orły");

        List<Szostka> list = szostkaService.getAllSzostka();

        assertThat(list).hasSizeGreaterThanOrEqualTo(2);
    }

    @Test
    void shouldDeleteSzostka() {
        Szostka saved = createSzostka("Niedźwiedzie");

        szostkaService.deleteSzostkaById(saved.getId());

        assertThat(szostkaRepository.findById(saved.getId())).isEmpty();
    }

    @Test
    void shouldModifySzostka() {
        Szostka saved = createSzostka("Stara");

        Szostka update = new Szostka();
        update.setNazwa("Nowa");
        update.setDataStworzenia(LocalDateTime.now());

        Szostka result =
                szostkaService.modifySzostkaById(saved.getId(), update);

        assertThat(result.getNazwa()).isEqualTo("Nowa");
    }

    @Test
    void shouldThrowWhenModifyingToDuplicateName() {
        createSzostka("Pierwsza");
        Szostka second = createSzostka("Druga");

        Szostka update = new Szostka();
        update.setNazwa("Pierwsza");

        assertThatThrownBy(() ->
                szostkaService.modifySzostkaById(second.getId(), update)
        ).isInstanceOf(DuplicateSzostkaException.class);
    }
}