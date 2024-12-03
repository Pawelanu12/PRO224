
'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {FaTrash} from "react-icons/fa";

export default function GlobalInformation({globalInfo}) {
    const {deleteFromList,user}=useContext(GlobalContext)
  //  const date=new Date(globalInfo.date)
   // const data=`${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return(
        <div style={{marginLeft: '10%',marginRight:'10%'}}>
            {user.typUzytkownika==="Admin"&& <FaTrash onClick={()=>deleteFromList(globalInfo.id,"GlobalInformation")}/>}

            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: "yellow"
            }}>
                <p>{globalInfo.id}</p>
                <p>{globalInfo.date}</p>
            </div>
            <div style={{width: '100%',
                height:'300px',
                overflow:"auto",
                overflowWrap:"break-word",
                backgroundColor: 'red',}}>
                <p >{globalInfo.opis}</p>
            </div>
        </div>
    )
}
// style={{ overflow:"hidden auto"}}