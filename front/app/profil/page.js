'use client'

import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import {useContext, useEffect, useState} from "react";
import Informacja from "@/app/profil/Informacja";
import MojePosty from "@/app/profil/MojePosty";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import GlownaInformacja from "@/app/profil/GlownaInformacja";

export default function Profil(){
    const [item,setItem]=useState("Posty")
    return(
        <div className={"profil"}>
       <GlownaInformacja item={item} setItem={setItem}/>
        {item==="Informacje"&&<Informacja/>}
        {item==="Posty"&&<MojePosty/>}
        {item==="Zdjecia"&&<p/>}
    </div>)
}