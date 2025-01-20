'use client'



import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Wplata from "@/app/classes/Wplata";

export default function Kwoty(){
    const {kwoty,getFromList}=useContext(GlobalContext)
    useEffect(()=>{
        getFromList("Kwoty")
    },[])

    if(!kwoty)return <div></div>

    return(<div>
        {kwoty.map(kwota=>(<Wplata wplata={kwota} key={kwota.id}></Wplata>))}
    </div>)
}

