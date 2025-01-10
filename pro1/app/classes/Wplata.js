'use client'

import {GlobalContext} from "@/app/providers/GlobalProvider";
import {useContext} from "react";

export default function Wplata({wplata}){
    const {user,zmienEdycje}=useContext(GlobalContext)
    if(!wplata)return (<div>Nie ma wplaty</div>)
    return (<div>
        <p>data:{wplata.date}</p>
        <p>kwota:{wplata.kwota}</p>
        {(user.typUzytkownika==="Admin"||user.typUzytkownika==="Druzynowy")&& <button onClick={()=>zmienEdycje(wplata)}>Edit</button>}

    <br/><br/></div>)
}