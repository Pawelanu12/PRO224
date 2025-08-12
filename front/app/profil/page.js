'use client'

import NAVBARREGISTED from "@/app/navbars/NAVBARREGISTED";
import {useContext, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import INFORMACJA from "@/app/profil/INFORMACJA";

export default function PROFILE(){
    const {user}=useContext(GlobalContext)
    const [item,setItem]=useState("Posty")
    // console.log(new Date("2025-08-07"))
    return(<div>
        <NAVBARREGISTED/>
        <div style={{padding:"20px",paddingTop:"70px"}}>
            <div style={{backgroundColor:"#3A4F39"}}>
                <div className={"flexRow"} style={{alignItems:"flex-end"}}>
                    <img className={"ikona"} style={{margin:"10px"}} src={user.ikona} alt={"ikona"}/>
                    <p style={{paddingBottom:"10px"}}>{user.imie+"  "+user.nazwisko}</p>
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
        {item==="Informacje"&&<INFORMACJA/>}

    </div>)
}