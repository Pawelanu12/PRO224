'use client'

import NavbarZarejestrowana from "@/app/navbar/NavbarZarejestrowana";
import {useContext, useEffect, useState} from "react";
import Information from "@/app/profile/Information";
import MyPosts from "@/app/profile/MyPosts";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import MainInformation from "@/app/profile/MainInformation";

export default function Profil(){
    const [item,setItem]=useState("Posty")
    return(
        <div className={"profil"}>
       <MainInformation item={item} setItem={setItem}/>
        {item==="Informacje"&&<Information/>}
        {item==="Posty"&&<MyPosts/>}
        {item==="Zdjecia"&&<p/>}
    </div>)
}