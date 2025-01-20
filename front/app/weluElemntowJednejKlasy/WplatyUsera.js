'use client'



import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Wplata from "@/app/classes/Wplata";

export default function WplatyUsera(){
    const {kwoty,getFromList,onPokazywanieChange,ladowanie}=useContext(GlobalContext)
    useEffect(()=>{
        getFromList("Wplaty usera")
    },[])
if(ladowanie)return <div>Ladowanie....</div>
    if(!kwoty||!kwoty.length)return <div>Nie ma wplat</div>

    return(<div>
        <button style={{color:'red'}}
                onClick={()=>onPokazywanieChange({target:{value:"Users"}})}>Powrót do userów</button>
        {kwoty.map(kwota=>(<Wplata wplata={kwota} key={kwota.id}></Wplata>))}
    </div>)
}

