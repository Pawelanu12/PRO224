'use client'

import Event from "@/app/classes/Event";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function MyEvents(){
    const {user,onPokazywanieChange,getFromList,setList,events}=useContext(GlobalContext)
    useEffect(()=>{
        getFromList("Attended Events")
    },[])
    if(!events.length)
        return(<div>nie zaplanowano żadnego eventu</div>)
    return(
        <div>
            <p style={{textAlign: "center", color: "red"}}>Events</p>

            {events.map(e => (<div key={e.id}><Event key={e.id} event={e}></Event><br/><br/></div>))}

        </div>
    )
}