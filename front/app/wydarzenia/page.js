'use client'

import FILTER from "@/app/wydarzenia/FILTER";
import {useContext, useEffect, useState} from "react";
import {WydarzeniaContext} from "@/app/providers/WydarzeniaProvider";
import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function WYDARZENIA(){
    const {wydarzenia,nazwa,typ,data}=useContext(WydarzeniaContext)
    const {router}=useContext(GlobalContext)
    const[wydarzeniaSortowane,setWydarzeniaSortowane]=useState(wydarzenia);
    console.log(wydarzenia)
    useEffect( ()=>{
        const sort= ()=>{
             setWydarzeniaSortowane(wydarzenia.filter(w=>
                 w.nazwa.includes(nazwa)&&
                 (w.typ===typ||typ==="Typ wydarzenia")&&
                 (data===''||new Date(w.startDate).getTime()>new Date(data).getTime())
             ))
        }
         sort()

    },[wydarzenia,nazwa,typ,data])
    const dateToString=(data)=>{
        return data.getHours()+':'+data.getMinutes()+' '+data.getDate()+'/'+ (data.getMonth()+1)+'/'+data.getFullYear()
    }
    const przecinekDat=(startDate,endDate)=>{

        return(dateToString(new Date(startDate))+
            ' - '+dateToString(new Date(endDate)))
    }
    return (
        <div>
            <NAVBARUNREGISTED/>
        <div style={{paddingTop:"50px"}}>
            <FILTER/>
            <div style={{position:"fixed",left:"250px",width:"30px",borderRight:"solid green 1px",height:"100%"}}></div>
            <div style={{paddingLeft:"280px"}}  className={"flexRow"}>
                {wydarzeniaSortowane.map((wydarzenie,i) => (
                    <div className={"wydarzenie"} key={i}
                         onClick={() => router.replace("/wydarzenia/" + wydarzenie.id)}>
                        <p>{wydarzenie.nazwa}</p>
                        <img style={{display: "block", margin: "0 auto"}} src="/images/event.png" loading="lazy"
                             alt="cat"/>


                        <p>{dateToString(new Date(wydarzenie.startDate))}</p>
                        <p>{dateToString(new Date(wydarzenie.endDate))}</p>
                    </div>))}
                <div>

                </div>
            </div>
        </div>
        </div>
            )
}