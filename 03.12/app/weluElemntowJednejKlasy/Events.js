'use client'

import Event from "@/app/classes/Event";

export default function Events({events}){
    if(!events.length)
        return(<div>nie zaplanowano żadnego eventu</div>)
    return(
        <div>
            <p style={{textAlign: "center", color: "red"}}>Events</p>

            {events.map(e => (<div key={e.id}><Event key={e.id} event={e}></Event><br/><br/></div>))}

        </div>
    )
}