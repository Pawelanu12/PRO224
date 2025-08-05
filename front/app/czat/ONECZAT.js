'use client'

import {useContext, useEffect} from "react";
import {CzatContext} from "@/app/providers/CzatProvider";

export default function ONECZAT(){
const {getCzat,czat,loading}=useContext(CzatContext)
    useEffect(()=>{
        const getOneCzat=async()=>{
            await getCzat();
        }
        getOneCzat()
    },[])
    console.log(czat)
    console.log(loading)
   if(loading) return <p style={{paddingLeft:"40vw",paddingTop:"50px",textAlign:"center"}}>loading</p>
    return (
       <div style={{marginLeft:"40vw",paddingTop:"50px",backgroundColor:"#4F5D4E"}}>
           {czat.length===0&&<p>to jest początek waszego czatu</p>}
           {czat.length>0&&czat.map((message,i) =>(<div  key={i}>
               {(i===0||
               new Date(czat[i-1].data).getDay()!==new Date(message.data).getDay()||
               czat[i-1].autor!==message.autor)&&
                   <div style={{display:'flex', paddingLeft:"10px",paddingTop:"20px"}}>
                   <img src={message.img} alt={"ikona"} style={{paddingLeft:"10px",width:"48px"}}/>
               <div style={{paddingLeft:"10px",paddingRight:"20px",width:"100%"}}><p>{message.autor+"     "+message.data}</p>
               <p style={{backgroundColor:"#405E3F"}} >{message.text}</p></div>
                   </div>}
                   {
                       !(i === 0 ||
                           new Date(czat[i - 1].data).getDay() !== new Date(message.data).getDay() ||
                           czat[i - 1].autor !== message.autor) &&
                       <p style={{marginLeft:"68px",marginRight:"20px",backgroundColor:"#405E3F"}}>{message.text}</p>
                   }
               </div>)
           )}
       </div>
    )
}