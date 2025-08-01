'use client'

import {useContext} from "react";
import {SprawnoscContext} from "@/app/providers/SprawnoscProvider";
import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";
import SPRAWNOSC from "@/app/sprawnosci/SPRAWNOSC";
import FILTER from "@/app/sprawnosci/FILTER";

export default function SPRAWNOSCI(){
    const {sprawnosciPosortowane}=useContext(SprawnoscContext)
    const typySprawnosci=["artystyczne","bajkowe","kultoroznawcze"]
console.log(sprawnosciPosortowane)
        return(
        <div>
            <NAVBARUNREGISTED/>
            <div style={{paddingTop:"50px"}}>
                <FILTER/>
                <h1 style={{marginLeft: "25px"}}>Sprawnosci artystyczne</h1>
                <div className={"flexRow"}>

                    {sprawnosciPosortowane.filter(s => s.typ === "artystyczne").map((sprawnosc, i) => (
                        <SPRAWNOSC key={i} sprawnosc={sprawnosc}/>

                    ))}
                </div>
                <h1 style={{marginLeft: "25px"}}>Sprawnosci bajkowe</h1>
                <div className={"flexRow"}>

                    {sprawnosciPosortowane.filter(s => s.typ === "bajkowe").map((sprawnosc, i) => (
                        <SPRAWNOSC key={i} sprawnosc={sprawnosc}/>

                    ))}
                </div>
            </div>
        </div>
        )
}
//"obraz":"https://raw.githubusercontent.com/Pawelanu12/PRO224/s27297/app/data/obraz_sprawnosci.png",

