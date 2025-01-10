package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("Zuch") // Wartość dyskryminacyjna w kolumnie typ_uzytkownika
public class Zuch extends Uzytkownik {

    @Column(name = "data_dolaczenia_do_gromady")
    private LocalDateTime dataDolaczeniaDoGromady;


    @Column(name = "szostka_id")
    private Long szostka_id;

    @Column(name = "rodzic_id1")
    private Long rodzic1;

    @Column(name = "rodzic_id2")
    private Long rodzic2;

    public void setDataDolaczeniaDoGromady(LocalDateTime dataDolaczeniaDoGromady) {
        this.dataDolaczeniaDoGromady = dataDolaczeniaDoGromady;
    }

    public void setSzostka_id(Long szostka_id) {
        this.szostka_id = szostka_id;
    }

    public void setRodzic1(Long rodzic1) {
        this.rodzic1 = rodzic1;
    }

    public void setRodzic2(Long rodzic2) {
        this.rodzic2 = rodzic2;
    }

    public void setZdobyteSprawnosci(List<ZdobyteSprawnosci> zdobyteSprawnosci) {
        this.zdobyteSprawnosci = zdobyteSprawnosci;
    }

    public LocalDateTime getDataDolaczeniaDoGromady() {
        return dataDolaczeniaDoGromady;
    }

    public Long getSzostka_id() {
        return szostka_id;
    }

    public Long getRodzic1() {
        return rodzic1;
    }

    public Long getRodzic2() {
        return rodzic2;
    }

    public List<ZdobyteSprawnosci> getZdobyteSprawnosci() {
        return zdobyteSprawnosci;
    }

    @OneToMany(mappedBy = "uzytkownik", cascade = CascadeType.ALL)
     private List<ZdobyteSprawnosci> zdobyteSprawnosci;
}
