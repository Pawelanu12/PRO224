'use client'


import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Czaty from "@/app/czat/Czaty";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";

import CzatWithWebSocket from "@/app/czat/websocket/CzatWithWebSocket";

export default function CZAT(){

    return(
    <div >
        <Czaty/>
        <CzatWithWebSocket/>
    </div>)
}