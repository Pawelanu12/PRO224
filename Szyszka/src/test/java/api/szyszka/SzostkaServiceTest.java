package api.szyszka;

import api.szyszka.Entities.Szostka;
import api.szyszka.Exceptions.DuplicateSzostkaException;
import api.szyszka.Repositories.SzostkaRepository;
import api.szyszka.Services.SzostkaService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SzostkaServiceTest {

    @Mock
    private SzostkaRepository szostkaRepository;

    @InjectMocks
    private SzostkaService szostkaService;

    // ========= create =========
    @Test
    void shouldCreateSzostka() {
        Szostka sz = new Szostka();
        sz.setNazwa("Test");

        when(szostkaRepository.save(sz)).thenReturn(sz);

        Szostka result = szostkaService.create(sz);

        assertThat(result).isEqualTo(sz);
        verify(szostkaRepository).save(sz);
    }

    // ========= getSzostkaById =========
    @Test
    void shouldReturnSzostkaById() {
        Szostka sz = new Szostka();
        sz.setId(1L);

        when(szostkaRepository.findById(1L))
                .thenReturn(Optional.of(sz));

        Szostka result = szostkaService.getSzostkaById(1L);

        assertThat(result).isEqualTo(sz);
    }

    // ========= getAllSzostka =========
    @Test
    void shouldReturnAllSzostki() {
        when(szostkaRepository.findAll())
                .thenReturn(List.of(new Szostka(), new Szostka()));

        List<Szostka> result = szostkaService.getAllSzostka();

        assertThat(result).hasSize(2);
    }

    // ========= deleteSzostkaById =========
    @Test
    void shouldDeleteSzostkaById() {
        szostkaService.deleteSzostkaById(1L);

        verify(szostkaRepository).deleteById(1L);
    }

    // ========= modifySzostkaById =========
    @Test
    void shouldModifySzostka() {
        Szostka oldSz = new Szostka();
        oldSz.setId(1L);
        oldSz.setNazwa("Old");

        Szostka update = new Szostka();
        update.setNazwa("New");
        update.setDataStworzenia(LocalDateTime.now());

        when(szostkaRepository.findById(1L))
                .thenReturn(Optional.of(oldSz));
        when(szostkaRepository.findByNazwa("New"))
                .thenReturn(Optional.empty());
        when(szostkaRepository.save(any()))
                .thenReturn(oldSz);

        Szostka result = szostkaService.modifySzostkaById(1L, update);

        assertThat(result.getNazwa()).isEqualTo("New");
    }

    @Test
    void shouldThrowDuplicateSzostkaExceptionOnModify() {
        Szostka oldSz = new Szostka();
        oldSz.setId(1L);
        oldSz.setNazwa("Old");

        Szostka update = new Szostka();
        update.setNazwa("New");

        when(szostkaRepository.findById(1L))
                .thenReturn(Optional.of(oldSz));
        when(szostkaRepository.findByNazwa("New"))
                .thenReturn(Optional.of(new Szostka()));

        assertThatThrownBy(() ->
                szostkaService.modifySzostkaById(1L, update)
        ).isInstanceOf(DuplicateSzostkaException.class);
    }
}