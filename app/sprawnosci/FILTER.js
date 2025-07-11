'use client'

import {useContext, useRef} from "react";
import {SprawnoscContext} from "@/app/providers/SprawnoscProvider";

export default function FILTER(){
    const {input,sprawnosci,setSprawnosciPosortowane}=useContext(SprawnoscContext)

    console.log(input)
    const logInput=()=>{
        console.log(input.current.value)
        if(input&&input.current&&input.current.value&&input.current.value.length>0){
            setSprawnosciPosortowane(sprawnosci.filter(s=>s.nazwa.startsWith(input.current.value)))
        }
        else{
            setSprawnosciPosortowane(sprawnosci)
        }
    }
    return (
        <div className={"flexRow"} style={{margin:"20px"}}>
            <h1 >Lista sprawnosci</h1>
            <label><input type={"text"} onChange={()=>logInput()} ref={input} placeholder={'szukaj po nazwe'}/></label>
        </div>
    )
}