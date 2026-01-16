package api.szyszka.Entities;

public enum TypSprawnosci {

    RED("Rozwój duchowy i emocjonalny"),
    YELLOW("Rozwój społeczny i obywatelski"),
    GREEN("Rozwój ekologiczny i przyrodniczy"),
    BLUE("Rozwój w rodzinie i higiena"),
    PURPLE("Rozwój osobisty i hobbystyczny");

    private final String opis;

    TypSprawnosci(String opis) {
        this.opis = opis;
    }

    public String getOpis() {
        return opis;
    }
}
