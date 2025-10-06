'use client'

import {useContext, useEffect} from "react";
import {SprawnoscContext} from "@/app/providers/SprawnoscProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import Sprawnosc from "@/app/sprawnosci/Sprawnosc";
import Filter from "@/app/sprawnosci/Filter";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Sprawnosci(){

    const {sprawnosciPosortowane,getSprawnosci}=useContext(SprawnoscContext)
    const {loading}=useContext(GlobalContext)
    const typySprawnosci=["artystyczne","bajkowe","kultoroznawcze"]
        // console.log(sprawnosciPosortowane)
    useEffect(()=>{
      getSprawnosci()
    },[])
    if(loading) return<p>loading</p>
    if(!sprawnosciPosortowane.length) return<p>nie ma sprawnosci</p>
    const typy=Array.from(new Set(sprawnosciPosortowane.map
    (s=>(s.typ||"underfined").toUpperCase())))
        return(
        <div>
            <NavbarZarejestrowana/>
            <div style={{paddingTop:"50px"}}>
                <Filter/>
                <div className={"Sprawnosci"}>
                    {typy.map(typ=><div key={typ||"underfined"} className={"Sprawnosci_po_typach"}>
                            <h1 className={"typ-sprawnosci"}>{typ}</h1>
                        <div className={"flexRow"}>
                            {
                            sprawnosciPosortowane
                            .filter(sprawnosc=>(sprawnosc.typ||"underfined").toUpperCase()===typ)
                            .map((sprawnosc,id)=><Sprawnosc key={typ+" "+id} sprawnosc={sprawnosc}/>)
                            }
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
        )
}
//"obraz":"https://raw.githubusercontent.com/Pawelanu12/PRO224/s27297/app/data/obraz_sprawnosci.png",

