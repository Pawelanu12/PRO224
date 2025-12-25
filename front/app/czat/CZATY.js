'use client'



import {useContext, useEffect, useState} from "react";
import {CzatContext} from "@/app/providers/CzatProvider";
import NowyCzatDialog from "@/app/czat/NowyCzatDialog";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
//pokazuje wszystkich uzytkowników i gruppy
// do których pisales wczestniej lub jestes zarejestrowany
const getNazwa=(c,login)=>{
    if(c.nazwa)
        return c.nazwa;
    return (c.uczestnicyIds.filter(item=>item!==login).toString());
}

export default function Czaty(){
    const {czaty,getCzaty,setCzat,setCzaty}=useContext(CzatContext)
    const {user}=useContext(GlobalContext)
    useEffect(() => {
        getCzaty()
    }, [user]);
    useEffect(() => {
        if(!user)return
        const stompClient = new Client({
            webSocketFactory: () =>
                new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/ws`),

            onConnect: () => {
                // console.log(`${user.id}/queue/chat-updates`)
                // stompClient.subscribe(`/user/queue/chat-updates`, (msg) => {
                stompClient.subscribe(`/topic/uzytkownik/${user.id.toString()}`, (msg) => {
                   console.log(msg)
                    const data = JSON.parse(msg.body);
                    console.log(data)
                    setCzaty(
                        prev=>prev.map(c=>c.id===data.czat_id?{
                            ...c,
                            nieprzeczytane_wiadomosci:data.nieprzeczytane_wiadomosci,
                            wiadomosc:data.wiadomosc
                        }:c
                    ))
                });
            },

            onStompError: (frame) => {
                console.error(frame);
            },
        });

        stompClient.activate();

        return () => stompClient.deactivate();
    }, [user]);
    if(!czaty)return <div>nie ma czatow</div>

    return(
        <div style={{
            position: "fixed",
            width: "40vw",
            overflow: "auto",
            height:"100vh"
        }}>

            <div style={{display:"flex",height:"80px",backgroundColor:"#4D644C"}}>
                <NowyCzatDialog/></div>
            {czaty.map((c,id)=>
                <div onClick={()=>setCzat(c)} style={{display:"flex",height:"80px",backgroundColor:"#4D644C"}} key={id}>
                <img className={"ikona"} src={c.obraz} alt={"ikona"}/>
                <div  style={{backgroundColor:"#405E3F",margin:"20px",width:"100%"}}>
                   <p style={{textAlign:"center"}}>{getNazwa(c,user.login)}</p>
                    {c.wiadomosc&&<p>{c.wiadomosc.tresc}</p>}
                </div>
                <div style={{borderRadius:"100%", width:"25px",height:"25px",
                    textAlign:"center",borderColor:"red",borderWidth:"2px"}}>
                    {c.nieprzeczytane_wiadomosci}</div>
            </div>)}
        </div>
    )
}