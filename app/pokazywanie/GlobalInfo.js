'use client'

import Event from "@/app/classes/GlobalInformation";
import GlobalInformation from "@/app/classes/GlobalInformation";

export default function GlobalInfo({globalInfo}){
    if(!globalInfo.length)
        return(<div>nie zaplanowano żadnej informacji ogolnej</div>)
    return(
        <div>
            <p style={{textAlign:"center",color:"red"}}>Global information</p>
            {globalInfo.map(e=>(<div key={e.id}><GlobalInformation key={e.id} globalInfo={e}></GlobalInformation><br/><br/></div>))}

        </div>
    )
}