'use client'


import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Dzieci(){
    const {dzieci,getDzieci,user,pushClick}=useContext(GlobalContext)
    useEffect(() => {
        if(!user)return
        getDzieci()
    }, [user]);

    if(!dzieci?.length)return<div>nie masz przypisanych dzieci</div>

    return (<div className={"w-full my-2 bg-[#3A4F39] text-white flex flex-row flex-wrap" }>
        {dzieci.map(d=>(
            <div key={d.id} className={"m-2 justify-center flex flex-col items-center cursor-pointer"}
                 onClick={(e) => pushClick(e,`/profile/user/${d.id}`)}>
                <img src={"/images/user_logo.png"} alt={""} className={"max-h-20 max-w-20 rounded-full"}/>
                <p className={"text-center"}>{d.login}</p>
            </div>
        ))}
    </div>)
}