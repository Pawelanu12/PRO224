
'use client'

import {GlobalContext} from "@/app/providers/GlobalProvider";
import {useContext} from "react";
import {FaTrash} from "react-icons/fa";

export default function Wplata({wplata}){
    const {user,zmienEdycje,deleteFromList}=useContext(GlobalContext)
    if(!wplata)return (<div>Nie ma wplaty</div>)
    const date=new Date(wplata.dataWplaty).toLocaleDateString("en-US")
    return (<div style={{border: "solid black 1px", backgroundColor: 'yellow', width: "100%", paddingLeft: "10px"}}>
        {(user.typUzytkownikaId === 1) && <FaTrash onClick={() => deleteFromList(wplata.id, "Kwota")}/>}
        <p>Nazwa:{wplata.nazwa}</p>
        <p>Id usera:{wplata.uzytkownikId}</p>
        <p>data:{date}</p>
        <p>kwota:{wplata.kwota}</p>
        {(user.typUzytkownikaId === 1) && <button onClick={() => zmienEdycje(wplata)}>Edit</button>}

        <br/><br/></div>)
}
