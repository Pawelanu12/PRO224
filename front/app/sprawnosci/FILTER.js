'use client'

import {useContext, useRef} from "react";
import {SprawnoscContext} from "@/app/providers/SprawnoscProvider";

export default function Filter(){
    const {input,logInput}=useContext(SprawnoscContext)



    return (
        <div className={"sprawnosci-filter"} >
            <label className={"sprawnosci-filter-label"} >Lista sprawnosci
                <input className={"sprawnosci-filter-input"}  type={"text"}
                       onChange={()=>logInput()} ref={input}
                       placeholder={'szukaj po nazwe'}/></label>
        </div>
    )
}