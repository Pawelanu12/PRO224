"use client"

import User from "@/app/classes/User";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function PageUsera() {
    const {onPokazywanieChange}=useContext(GlobalContext);
    return(
        <div>
            <button style={{color: 'red'}}
                    onClick={() => onPokazywanieChange({target: {value: "Users"}})}>Powrót do userów
            </button>
            <User></User>
        </div>
    )
}