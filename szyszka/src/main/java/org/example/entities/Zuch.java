package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("zuch") // Wartość dyskryminacyjna w kolumnie typ_uzytkownika
public class Zuch extends Uzytkownik {

    @Column(name = "data_dolaczenia_do_gromady")
    private LocalDateTime dataDolaczeniaDoGromady;

    @ManyToOne
    @JoinColumn(name = "szostka_id")
    private Szostka szostka;

    @ManyToOne
    @JoinColumn(name = "rodzic_id1")
    private Uzytkownik rodzic1;

    @ManyToOne
    @JoinColumn(name = "rodzic_id2")
    private Uzytkownik rodzic2;

    @OneToMany(mappedBy = "uzytkownik", cascade = CascadeType.ALL)
    private List<ZdobyteSprawnosci> zdobyteSprawnosci;
}
