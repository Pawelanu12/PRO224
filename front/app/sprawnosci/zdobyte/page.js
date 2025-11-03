'use client'

import {useContext, useEffect} from "react";
import {SprawnoscContext} from "@/app/providers/SprawnoscProvider";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import Sprawnosc from "@/app/sprawnosci/Sprawnosc";
import Filter from "@/app/sprawnosci/Filter";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";

export default function Sprawnosci(){

    const {sprawnosciPosortowane,getZdobyteSprawnosci}=useContext(SprawnoscContext)
    const {loading,user}=useContext(GlobalContext)
    const typySprawnosci=["artystyczne","bajkowe","kultoroznawcze"]
    useEffect(()=>{
        if(user.id)
            getZdobyteSprawnosci(user.id)
    },[user])
    if(loading) return <div>
        {user.login ? <NavbarZarejestrowana/> : <NavbarNiezarejestrowana/>}
        <p style={{paddingTop:'50px'}}>loading</p>
    </div>
    if (!sprawnosciPosortowane.length) return <div>
        {user.login ? <NavbarZarejestrowana/> : <NavbarNiezarejestrowana/>}
        <p style={{paddingTop:'50px'}}>nie ma sprawnosci</p>
    </div>
    const typy = Array.from(new Set(sprawnosciPosortowane.map
    (s=>(s.typ||"underfined").toUpperCase())))
    console.log(user);
    return(
        <div>
            {user.login?<NavbarZarejestrowana/>:<NavbarNiezarejestrowana/>}

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

