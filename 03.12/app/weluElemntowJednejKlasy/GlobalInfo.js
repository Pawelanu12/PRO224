'use client'

import Event from "@/app/classes/GlobalInformation";
import GlobalInformation from "@/app/classes/GlobalInformation";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function GlobalInfo({globalInfo}){
    const {user,onPokazywanieChange}=useContext(GlobalContext)

    if(!globalInfo.length)
        return(<div>nie zaplanowano żadnej informacji ogolnej</div>)
    return(
        <div>
            {user&&user.typUzytkownika==="Admin"&& <button onClick={()=>onPokazywanieChange({target:{value:"AddGlobalInformation"}})}>Dodaj nowy global info</button>}

            <p style={{textAlign:"center",color:"red"}}>Global information</p>
            {globalInfo.map(e=>(<div key={e.id}><GlobalInformation key={e.id} globalInfo={e}></GlobalInformation><br/><br/></div>))}

        </div>
    )
}