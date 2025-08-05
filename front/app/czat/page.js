'use client'


import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import CZATY from "@/app/czat/CZATY";
import NAVBARREGISTED from "@/app/navbars/NAVBARREGISTED";
import ONECZAT from "@/app/czat/ONECZAT";

export default function CZAT(){
    const {user,setUser} =useContext(GlobalContext);

    return(
    <div style={{backgroundColor:"#4F5D4E"}}>
        <NAVBARREGISTED/>
        <CZATY/>
        <ONECZAT />
    </div>)
}