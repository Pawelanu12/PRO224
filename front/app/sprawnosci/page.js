'use client'

import {useContext} from "react";
import {SprawnoscContext} from "@/app/providers/SprawnoscProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import Sprawnosc from "@/app/sprawnosci/Sprawnosc";
import Filter from "@/app/sprawnosci/Filter";

export default function Sprawnosci(){
    const {sprawnosciPosortowane}=useContext(SprawnoscContext)
    const typySprawnosci=["artystyczne","bajkowe","kultoroznawcze"]
console.log(sprawnosciPosortowane)
        return(
        <div>
            <NavbarZarejestrowana/>
            <div style={{paddingTop:"50px"}}>
                <Filter/>
                <h1 style={{marginLeft: "25px"}}>Sprawnosci artystyczne</h1>
                <div className={"flexRow"}>

                    {sprawnosciPosortowane.filter(s => s.typ === "artystyczne").map((sprawnosc, i) => (
                        <Sprawnosc key={i} sprawnosc={sprawnosc}/>

                    ))}
                </div>
                <h1 style={{marginLeft: "25px"}}>Sprawnosci bajkowe</h1>
                <div className={"flexRow"}>

                    {sprawnosciPosortowane.filter(s => s.typ === "bajkowe").map((sprawnosc, i) => (
                        <Sprawnosc key={i} sprawnosc={sprawnosc}/>

                    ))}
                </div>
            </div>
        </div>
        )
}
//"obraz":"https://raw.githubusercontent.com/Pawelanu12/PRO224/s27297/app/data/obraz_sprawnosci.png",

