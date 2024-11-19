'use client'



import {c} from "react/compiler-runtime";

export default function Event({event}){

    const startDate=new Date(event.startDate)
    const endDate=new Date(event.endDate)

    const dateStartDay=startDate.getDate()+"."+startDate.getMonth()
        +"."+startDate.getFullYear()
     const dateStartHoursMinustes=startDate.getHours()+"."+startDate.getMinutes()

    const dateEndDay=endDate.getDate()+"."+endDate.getMonth()
        +"."+endDate.getFullYear()
    const dateEndHoursMinustes=endDate.getHours()+"."+endDate.getMinutes()



    return(
        <div>
            <p style={{textAlign:"center",backgroundColor:"red"}}>{event.nazwa}</p>
            {dateStartDay===dateEndDay&&
                (<p style={{textAlign:"center",backgroundColor:"yellow"}}>
            Event odbędzie się {dateStartDay} w godzinach {dateStartHoursMinustes}-
                    {dateEndHoursMinustes}</p>)}

            {dateStartDay!==dateEndDay&&
                (<p style={{textAlign:"center",backgroundColor:"yellow"}}>
           Event zaczyna się {dateStartDay} w {dateStartHoursMinustes} i
                    kończy się {dateEndDay} w {dateEndHoursMinustes}</p>)}
            <p style={{textAlign:"center",backgroundColor:"lightblue",overflowWrap:"break-word"}}>{event.opis}</p>
        </div>
    )
}