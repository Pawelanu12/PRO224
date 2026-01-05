'use client'

import {useContext, useRef} from "react";
import {SprawnoscContext} from "@/app/providers/SprawnoscProvider";

export default function Filter(){
    const {input,logInput}=useContext(SprawnoscContext)



    return (
        <div className={"flex flex-wrap items-center gap-3 px-5 pt-5 pb-4"} >
            <label className={"flex items-center gap-3 text-white text-sm font-semibold"} >Lista sprawnosci
                <input className={"rounded-md bg-gray-700 px-3 py-1.5 text-sm text-white" +
                    " outline-none placeholder-gray-400 focus:ring-2 focus:ring-green-500"}  type={"text"}
                       onChange={()=>logInput()} ref={input}
                       placeholder={'szukaj po nazwe'}/></label>
        </div>
    )
}