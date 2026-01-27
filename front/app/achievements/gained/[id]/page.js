'use client'

import React, {useContext, useEffect, useState} from "react";
import {SprawnoscContext} from "@/app/providers/AchievementProvider";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import Achievements from "@/app/achievements/Achivements";

export default function Sprawnosci({params}){

    const {sprawnosci,zdobyteSprawnosci,getZdobyteSprawnosci,getSprawnosci}=useContext(SprawnoscContext)
    const {id} =  React.use(params);
    const [loading,setLoading] = useState(true)
    const {user}= useContext(GlobalContext)
    const zdobyteId=zdobyteSprawnosci.map(z=>z.sprawnoscId)

    useEffect(()=>{
        if(!id)return
        if(!user)return;
        getZdobyteSprawnosci(id)
        getSprawnosci()
        setLoading(false)
    },[id,user])
    if(loading) return <div>
        <p style={{paddingTop:'50px'}}>loading</p>
    </div>
    if (!zdobyteSprawnosci.length) return <div>
        <p style={{paddingTop:'50px'}}>nie masz zdobytych sprawnosci</p>
    </div>
    return(
        <Achievements sprawnosciPosortowane={sprawnosci.filter(s=>zdobyteId.includes(s.id))}></Achievements>
    )
}
//"obraz":"https://raw.githubusercontent.com/Pawelanu12/PRO224/s27297/app/data/obraz_sprawnosci.png",

