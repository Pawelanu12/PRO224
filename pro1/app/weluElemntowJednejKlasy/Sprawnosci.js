'use client'

import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import User from "@/app/classes/User";
import Sprawnosc from "@/app/classes/Sprawnosc";

export default function Sprawnosci(){
    const {sprawnosci,loading,getFromList,user,onPokazywanieChange,}=useContext(GlobalContext)
   // console.log(sprawnosci)
    useEffect(()=>{
        getFromList("Sprawnosci")
    },[])
    if(loading)return <div>
    <p>loading...</p></div>
    if(!sprawnosci||!sprawnosci.length)return <div>
        {user&&user.typUzytkownikaId===1&& <button onClick={()=>onPokazywanieChange({target:{value:"AddSprawnosc"}})}>Dodaj nowa sprawnosc</button>}
        <p>nie ma zadnej sprawnosci w tabeli</p></div>


    return(<div style={{padding:'30px'  }}>
        {/*<button style={{border:"solid black 1px",backgroundColor:"red"}} onClick={()=>onPokazywanieChange({target:{value:"MoiSprawnosci"}})}>Pokaż Sprawnosci które posiadam</button>*/}
       <br/> {user&&user.typUzytkownikaId===1&& <button style={{border:"solid black 1px",backgroundColor:"red"}} onClick={()=>
            onPokazywanieChange({target:{value:"AddSprawnosc"}})}>Dodaj nowa sprawnosc</button>}
        {sprawnosci.map(user=>(<div key={user.id}><Sprawnosc sprawnosc={user} key={user.id}></Sprawnosc><br/></div>))}
    </div>)
}