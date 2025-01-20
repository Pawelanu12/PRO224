'use client'

import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import User from "@/app/classes/User";
import Sprawnosc from "@/app/classes/Sprawnosc";

export default function MySprawnosci(){
    const {sprawnosci,loading,getFromList,user,onPokazywanieChange,achivementUserId}=useContext(GlobalContext)
    useEffect(()=>{
        getFromList("Gained Achivements")
    },[])
   // console.log(sprawnosci)
    if(loading)return <div>
        <p>loading...</p></div>
    if(!sprawnosci||!sprawnosci.length)return <div>
        {user&&user.typUzytkownikaId===1&&<button style={{color:'red'}}
                                                  onClick={()=>onPokazywanieChange({target:{value:"Users"}})}>
            Pówrót do userów
        </button>}
        <p>nie ma zadnej sprawnosci w tabeli</p></div>

   // console.log(sprawnosci[0].dataZdobyciaSprawnosci.toString().substring(0,10))
    return(<div style={{padding:'30px'  }}>
        {user&&user.typUzytkownikaId===1&&<button style={{color:'red'}}
         onClick={()=>onPokazywanieChange({target:{value:"Users"}})}>
            Pówrót do userów
        </button>}
        {sprawnosci.map(gainedAchivements=>(<div key={gainedAchivements.id}>
            {gainedAchivements.dataZdobyciaSprawnosci&&<p>Date:{gainedAchivements.dataZdobyciaSprawnosci.toString().substring(0,10)}</p>}
            <Sprawnosc sprawnosc={gainedAchivements.achievement} key={gainedAchivements.id}></Sprawnosc>
            <br/></div>))}
    </div>)
}