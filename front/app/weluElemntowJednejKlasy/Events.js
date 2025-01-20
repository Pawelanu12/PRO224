'use client'

import Event from "@/app/classes/Event";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Events(){
    const {user,onPokazywanieChange,getFromList,loading,events}=useContext(GlobalContext)
    //console.log(events)
    useEffect(()=>{
        getFromList("Events")
    },[])
    if(!events.length)
        return(<div>
            {user&&user.typUzytkownikaId===1&& <button onClick={()=>onPokazywanieChange({target:{value:"AddEvent"}})}>Dodaj nowy event</button>}
           <br/> nie zaplanowano żadnego eventu</div>)
    if(loading)
        return <p>Loading...</p>
    return(
        <div>
            {user&&user.typUzytkownikaId===1&& <button onClick={()=>onPokazywanieChange({target:{value:"AddEvent"}})}>Dodaj nowy event</button>}
            <p style={{textAlign: "center", color: "red"}}>Events</p>

            {events.map(e => (<div key={e.id}><Event key={e.id} event={e}></Event><br/><br/></div>) )}

        </div>
    )
}