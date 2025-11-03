'use client'

import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import {useContext, useEffect, useState} from "react";
import Informacja from "@/app/profil/Informacja";
import MojePosty from "@/app/profil/MojePosty";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Profil(){
    const {user} = useContext(GlobalContext);
    // useEffect(()=>{
        // setUser({
            // email: localStorage.getItem("uzytkownik_email"),
            // imie: localStorage.getItem("uzytkownik_imie"),
            // nazwisko: localStorage.getItem("uzytkownik_nazwisko"),
            // login: localStorage.getItem("uzytkownik_login"),
            // nrTelefonu : localStorage.getItem("uzytkownik_nr_telefonu"),
            // typUzytkownika:  localStorage.getItem("uzytkownik_typ_uzytkownika"),
            // dataUrodzenia:  localStorage.getItem("uzytkownik_data_urodzenia")||"",
            // gromada:  localStorage.getItem("uzytkownik_gromada")||"",
            // dataDolaczeniaDoGromady:  localStorage.getItem("uzytkownik_data_dolaczenia_do_gromady")||"",

        // })
    // },[])
    const [item,setItem]=useState("Posty")
    return(<div>
        <NavbarZarejestrowana/>
        <div style={{padding:"20px",paddingTop:"70px"}}>
            <div style={{backgroundColor:"#3A4F39"}}>
                <div className={"flexRow"} style={{alignItems:"flex-end"}}>
                    <img className={"ikona"} style={{margin:"10px"}} src={user.ikona||"/images/ikona.png"} alt={"ikona"}/>
                    <p style={{paddingBottom:"10px"}}>{user.login+" ("+user.imie+"  "+user.nazwisko+")"}</p>
                </div>
                <p style={{border:"solid black 1px"}}></p>
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
                    <div style={{backgroundColor:"#354545",margin:"10px"}}>
                        <button style={{}}>Zmień Haslo</button>
                    </div>

                </div>
            </div>
        </div>
        {item==="Informacje"&&<Informacja/>}
        {item==="Posty"&&<MojePosty/>}
        {item==="Zdjecia"&&<p/>}
    </div>)
}