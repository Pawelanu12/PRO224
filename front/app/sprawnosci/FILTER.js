'use client'

import {useContext, useRef} from "react";
import {SprawnoscContext} from "@/app/providers/SprawnoscProvider";

export default function Filter(){
    const {input,logInput}=useContext(SprawnoscContext)



    return (
        <div className={"flexRow"} style={{margin:"20px"}}>
            <h1 >Lista sprawnosci</h1>
            <label style={{paddingLeft:"10px"}}><input type={"text"} onChange={()=>logInput()} ref={input} placeholder={'szukaj po nazwe'}/></label>
        </div>
    )
}