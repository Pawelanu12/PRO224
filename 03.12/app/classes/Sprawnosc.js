'use client'


import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {FaTrash} from "react-icons/fa";

export default function Sprawnosc({sprawnosc}){
    const {user,deleteFromList}=useContext(GlobalContext)

    if(!sprawnosc)return<p>nie ma sprawnosci</p>
    return(
    <div>
        {user.typUzytkownika==="Admin"&& <FaTrash onClick={()=>deleteFromList(sprawnosc.id,"Sprawnosc")}/>}

        {(user.typUzytkownika==="Zuch"||user.typUzytkownika==="Rodzic")&& <div>
            <p >{sprawnosc.nazwa}</p>
            <p style={{overflowWrap:"break-word"}}>{sprawnosc.opis}</p>
        </div>}

        {(user.typUzytkownika==="Admin"||user.typUzytkownika==="Druzynowy")&& <div>
            <p>{sprawnosc.nazwa}</p>
            <div style={{overflowWrap: "break-word"}}>
                opis dla zuch:<br/>
                {sprawnosc.opis}</div>
            <div style={{overflowWrap: "break-word"}}>
                pelny opis:<br/>
                {sprawnosc.opisWymagan}</div>
        </div>}
    </div>)
}