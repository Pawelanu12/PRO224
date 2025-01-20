'use client'

import {FaTrash} from "react-icons/fa";


import {useContext, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {list} from "postcss";

export default function Event({event}){
    const [attenders,setAttenders]=useState(null);
    const {deleteFromList,user,onPokazywanieChange,zmienEdycje,addDoListy}=useContext(GlobalContext)
    const startDate=new Date(event.dataWyjazdu)
    const endDate=new Date(event.dataZakonczenia)
    //console.log(edit)
    const dateStartDay=startDate.getDate()+"."+(startDate.getMonth()+1)
        +"."+startDate.getFullYear()
    const dateStartHoursMinustes=startDate.getHours()+"."+startDate.getMinutes()

    const dateEndDay=endDate.getDate()+"."+(endDate.getMonth()+1)
        +"."+endDate.getFullYear()
    const dateEndHoursMinustes=endDate.getHours()+"."+endDate.getMinutes()

   const seeAttenders=(event)=>{
       const getAttenders=async (event) => {
           await fetch(`http://localhost:8080/api/wydarzenia/${event.id}/uczestnicy`)
               .then(res=>res.json())
               .then(res=>{
                       console.log(res)
                   if(res.length) {
                       let attenders = [];
                       res.map(attender => attenders.push(attender.user.id))
                       setAttenders(attenders)
                   }
               })
               .catch(err=>console.log(err))
       }
       getAttenders(event)
   }

    return(
        <div style={{marginLeft: "3%", marginRight: "3%"}}>
            {/*<button onClick={()=>onPokazywanieChange({target:{value:"EditEvent"}})}>Edit</button>*/}
            {user && user.typUzytkownikaId===1 &&
                <FaTrash onClick={() => deleteFromList(event.id, "Event")}/>}
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
                {user && (user.typUzytkownikaId===1) &&
                   <div style={{justifyContent:"center",display:"flex"}}> <button  onClick={() =>{ onPokazywanieChange({target:{value:"Events"}});zmienEdycje(event)}}>Edit</button></div>}
            {attenders&&attenders.length &&<p style={{backgroundColor:"red"}}>Id&#39;s of users that attend: {attenders.toString()}</p>}
            {/*{attenders.map(attender=>(<p key={attender.id}>{attender.user.id}</p>))}*/}
            {user && (<div style={{display: "flex", justifyContent: "space-between"}}>
                    <button onClick={() => addDoListy(event,"newUserAttend")}>Attend</button>
                {!attenders&&<button onClick={() => seeAttenders(event)}>See attended users</button>}
                {attenders&&attenders.length&&<button onClick={() => setAttenders(null)}>Hide attended users</button>}
                    <button onClick={() => deleteFromList(event.id, "notAttend")}>remove attendence</button>
                </div>)}

            </div>
            )
            }