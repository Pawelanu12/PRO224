'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import User from "@/app/classes/User";
import Sprawnosc from "@/app/classes/Sprawnosc";

export default function Sprawnosci(){
    const {sprawnosci}=useContext(GlobalContext)
    console.log(sprawnosci)
    if(!sprawnosci)return <div></div>


    return(<div>
        {sprawnosci.map(user=>(<div key={user.id}><Sprawnosc sprawnosc={user} key={user.id}></Sprawnosc><br/></div>))}
    </div>)
}