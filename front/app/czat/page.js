'use client'


import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Czaty from "@/app/czat/Czaty";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import OneCzat from "@/app/czat/OneCzat";

export default function CZAT(){

    return(
    <div style={{backgroundColor:"#4F5D4E"}}>
        <Czaty/>
        <OneCzat />
    </div>)
}