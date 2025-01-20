
'use client'


import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {FaTrash} from "react-icons/fa";

export default function Sprawnosc({sprawnosc}){
    const {user,deleteFromList,zmienEdycje,achivementUserId}=useContext(GlobalContext)
// console.log(user)
    if(!sprawnosc)return<p>nie ma sprawnosci</p>
    return(
        <div style={{justifyContent:'center',border:"solid black 1px",display:'flex',backgroundColor:'yellow',width:"100%"}}>
            {!achivementUserId&&user.typUzytkownikaId===1&&
                <FaTrash onClick={()=>deleteFromList(sprawnosc.id,"Sprawnosc")}/>}
            {achivementUserId&&user.typUzytkownikaId===1&&
                <FaTrash onClick={()=>deleteFromList(sprawnosc.id,"Gained Achivement")}/>}

            {(user.typUzytkownikaId!==1)&& <div>
                <p>Id:{sprawnosc.id}</p>
                <p>Nazwa:{sprawnosc.nazwa}</p>
                <p style={{overflowWrap: "break-word", backgroundColor: "green"}}>Opis:{sprawnosc.opis}</p>
            </div>}

            {(user.typUzytkownikaId===1)&& <div>
                <p>id:{sprawnosc.id}</p>
                <p>{sprawnosc.nazwa}</p>
                <div style={{overflowWrap: "break-word"}}>
                    opis dla zuch:
                    {sprawnosc.opis}</div>
                <div style={{overflowWrap: "break-word"}}>
                    pelny opis:
                    {sprawnosc.opisWymagan}</div>
                <button onClick={()=>zmienEdycje(sprawnosc)}>Edit</button>

            </div>}
        </div>)
}
