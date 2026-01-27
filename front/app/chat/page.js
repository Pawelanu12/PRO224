'use client'


import Czats from "@/app/chat/Czats";
import CzatWithWebSocket from "@/app/chat/websocket/CzatWithWebSocket";

export default function CZAT(){

    return(
    <div >
        <Czats/>
        <CzatWithWebSocket/>
    </div>)
}