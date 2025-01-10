'use client'



import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Wplata from "@/app/classes/Wplata";

export default function Kwoty({id}){
    const {kwoty}=useContext(GlobalContext)
    if(!id||!kwoty)return <div></div>
    const kwotyUsera=kwoty.filter(kwota=>kwota.idUsera==id)

    return(<div>
        {kwotyUsera.map(kwota=>(<Wplata wplata={kwota} key={kwota.id}></Wplata>))}
    </div>)
}

