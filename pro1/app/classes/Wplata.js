
'use client'

import {GlobalContext} from "@/app/providers/GlobalProvider";
import {useContext} from "react";

export default function Wplata({wplata}){
    const {user,zmienEdycje}=useContext(GlobalContext)
    if(!wplata)return (<div>Nie ma wplaty</div>)
    return (<div>
        <p>data:{wplata.date}</p>
        <p>kwota:{wplata.kwota}</p>
        {(user.typUzytkownikaId===1)&& <button onClick={()=>zmienEdycje(wplata)}>Edit</button>}

        <br/><br/></div>)
}
