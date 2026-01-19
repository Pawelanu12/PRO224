'use client'

import {useContext, useEffect, useState} from "react";
import Information from "@/app/profile/Information";
import MainInformation from "@/app/profile/MainInformation";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Posts from "@/app/forum/Posts";
import Dzieci from "@/app/profile/Dzieci";

export default function Profil(){
    const [item,setItem]=useState("Posty")
    const { user, loading } = useContext(GlobalContext);

    if (loading) return <div>loading</div>;
    if (!user) return <div>użytkownik nie znaleziony</div>;

    return(
        <div className={"p-5 h-[calc(100vh-50px)]"}>
       <MainInformation item={item} setItem={setItem} uzytkownik={user}/>
        {item==="Informacje"&&<Information uzytkownik={user}/>}
        {item==="Posty"&&<Posts classname={"ml-10"} wszystkie={false} id={user.id}/>}
        {item==="Dzieci"&&<Dzieci/>}
    </div>)
}