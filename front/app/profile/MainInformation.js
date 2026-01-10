import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";


export default function MainInformation({item,setItem}) {
    const {user}=useContext(GlobalContext);
    return (
            <div  className={"profil-gorny"}>
                <div className={"profil-gorny-dane"}>
                    <img className={"ikona"} style={{margin: "10px"}} src={user.ikona || "/images/ikona.png"}
                         alt={"ikona"}/>
                    <p >{user.login + " (" + user.imie + "  " + user.nazwisko + ")"}</p>
                </div>
                <p className={"profil-linia"}></p>
                <div className={"flexRow"} style={{justifyContent: "space-between"}}>
                    <div className={"flexRow"}>
                        <button className={`przyciskProfila ${item === "Posty" ? "active" : ""}`}
                                onClick={() => setItem("Posty")}>Posty
                        </button>
                        <button className={`przyciskProfila ${item === "Informacje" ? "active" : ""}`}
                                onClick={() => setItem("Informacje")}>Informacje
                        </button>
                        <button className={`przyciskProfila ${item === "Zdjecia" ? "active" : ""}`}
                                onClick={() => setItem("Zdjecia")}>Zdjęcia
                        </button>
                    </div>
                    <div className={"profil-zmien-haslo"}>
                        <button style={{}}>Zmień Haslo</button>
                    </div>

                </div>
            </div>
    )
}