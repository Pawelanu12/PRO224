'use client'

import Event from "@/app/classes/Event";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Events({events}){
    const {user,onPokazywanieChange}=useContext(GlobalContext)
    if(!events.length)
        return(<div>nie zaplanowano żadnego eventu</div>)
    return(
        <div>
            {user&&user.typUzytkownika==="Admin"&& <button onClick={()=>onPokazywanieChange({target:{value:"AddEvent"}})}>Dodaj nowy event</button>}
            <p style={{textAlign: "center", color: "red"}}>Events</p>

            {events.map(e => (<div key={e.id}><Event key={e.id} event={e}></Event><br/><br/></div>))}

        </div>
    )
}