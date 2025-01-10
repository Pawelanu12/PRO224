'use client'

import {FaTrash} from "react-icons/fa";


import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Event({event}){
    console.log(event)
    const {deleteFromList,user,onPokazywanieChange,zmienEdycje,edit}=useContext(GlobalContext)
    const startDate=new Date(event.startDate)
    const endDate=new Date(event.endDate)
    console.log(edit)
    const dateStartDay=startDate.getDate()+"."+(startDate.getMonth()+1)
        +"."+startDate.getFullYear()
    const dateStartHoursMinustes=startDate.getHours()+"."+startDate.getMinutes()

    const dateEndDay=endDate.getDate()+"."+(endDate.getMonth()+1)
        +"."+endDate.getFullYear()
    const dateEndHoursMinustes=endDate.getHours()+"."+endDate.getMinutes()

    console.log(endDate.getMonth())

    return(
        <div style={{marginLeft:"3%",marginRight:"3%"}}>
            {/*<button onClick={()=>onPokazywanieChange({target:{value:"EditEvent"}})}>Edit</button>*/}
            {user && user.typUzytkownika === "Druzynowy" && <FaTrash onClick={() => deleteFromList(event.id, "Event")}/>}
            <p style={{textAlign: "center", backgroundColor: "red"}}>{event.nazwa}</p>
            {dateStartDay === dateEndDay &&
                (<p style={{textAlign: "center", backgroundColor: "yellow"}}>
                    Event odbędzie się {dateStartDay} w godzinach {dateStartHoursMinustes}-
                    {dateEndHoursMinustes}</p>)}

            {dateStartDay !== dateEndDay &&
                (<p style={{textAlign: "center", backgroundColor: "yellow"}}>
                    Event zaczyna się {dateStartDay} w {dateStartHoursMinustes} i
                    kończy się {dateEndDay} w {dateEndHoursMinustes}</p>)}
            <p style={{textAlign: "center", backgroundColor: "lightblue", overflowWrap: "break-word"}}>{event.opis}</p>
            {user &&(user.typUzytkownika==="Przyboczny"||user.typUzytkownika==="Druzynowy")&& <button onClick={()=>zmienEdycje(event)}>Edit</button>}
        </div>
    )
}