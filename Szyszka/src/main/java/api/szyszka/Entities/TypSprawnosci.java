package api.szyszka.Entities;

public enum TypSprawnosci {

    CZERWONE("Rozwój duchowy i emocjonalny"),
    ZOLTE("Rozwój społeczny i obywatelski"),
    ZIELONE("Rozwój ekologiczny i przyrodniczy"),
    NIEBIESKIE("Rozwój w rodzinie i higiena"),
    FIOLETOWE("Rozwój osobisty i hobbystyczny");

    private final String opis;

    TypSprawnosci(String opis) {
        this.opis = opis;
    }

    public String getOpis() {
        return opis;
    }
}
