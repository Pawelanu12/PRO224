'use client'


import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Czats from "@/app/chat/Czats";
import NavbarZarejestrowana from "@/app/navbar/NavbarZarejestrowana";

import CzatWithWebSocket from "@/app/chat/websocket/CzatWithWebSocket";

export default function CZAT(){

    return(
    <div >
        <Czats/>
        <CzatWithWebSocket/>
    </div>)
}