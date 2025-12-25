'use client'

import {useContext, useEffect} from "react";
import {CzatContext} from "@/app/providers/CzatProvider";
import NapiszWiadomosc from "@/app/czat/NapiszWiadomosc";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import CzatWithWebSocket from "@/app/czat/websocket/CzatWithWebSocket";
//pokazuje wiadomosci w czacie

const getNazwa=(c,login)=>{
    if(c.nazwa)
        return c.nazwa;
    if(c.uczestnicyIds)
        return (c.uczestnicyIds.filter(item=>item!==login).toString());
    return "";
}
export default function OneCzat(){
    const {getCzat,czat,loading}=useContext(CzatContext)
    const {user}=useContext(GlobalContext)
    // useEffect(()=>{
    //     const getOneCzat=async()=>{
    //         await getCzat();
    //     }
    //     getOneCzat()
    // },[])
   if(loading) return <p style={{paddingLeft:"40vw",textAlign:"center"}}>loading</p>
    if(!czat)return <p style={{paddingLeft:"40vw",textAlign:"center"}}>czat nie znależony</p>
    return (
       <div style={{marginLeft:"40vw",backgroundColor:"#4F5D4E",
           height:"100vh",overflow:"auto",position:"fixed",width:"60vw"}}>
           <div style={{display:"flex",height:"80px",justifyContent:"center"}} >
               <img className={"ikona"} src={czat.ikona} alt={"ikona"}/>
               <div style={{backgroundColor:"#405E3F",margin:"20px",minWidth:"50%"}}>
                   <p >{getNazwa(czat,user.login)}</p>
               </div>
           </div>
           <CzatWithWebSocket id={czat.id}/>
           {/*{!czat.messages||czat.messages.length===0&&<p>to jest początek waszego czatu</p>}*/}
           {/*{czat.messages&&czat.messages.length>0&&czat.messages.map((message,i) =>(<div  key={i}>*/}
           {/*    {(i===0||*/}
           {/*    new Date(czat.messages[i-1].data).getDay()!==new Date(message.data).getDay()||*/}
           {/*    czat.messages[i-1].autor!==message.autor)&&*/}
           {/*        <div style={{display:'flex', paddingLeft:"10px",paddingTop:"20px"}}>*/}
           {/*        <img src={message.img} alt={"ikona"} className={"ikona"} style={{    margin:"0px"}}/>*/}
           {/*    <div style={{paddingLeft:"10px",paddingRight:"20px",width:"100%"}}><p>{message.autor+"     "+message.data}</p>*/}
           {/*    <p style={{backgroundColor:"#405E3F"}} >{message.text}</p></div>*/}
           {/*        </div>}*/}
           {/*        {*/}
           {/*            !(i === 0 ||*/}
           {/*                new Date(czat.messages[i - 1].data).getDay() !== new Date(message.data).getDay() ||*/}
           {/*                czat.messages[i - 1].autor !== message.autor) &&*/}
           {/*            <p style={{marginLeft:"68px",marginRight:"20px",backgroundColor:"#405E3F"}}>{message.text}</p>*/}
           {/*        }*/}
           {/*    </div>)*/}
           {/*)}*/}
           {/*<NapiszWiadomosc/>*/}
       </div>
    )
}