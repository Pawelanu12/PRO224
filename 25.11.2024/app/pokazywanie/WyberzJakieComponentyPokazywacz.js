'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function WyberzJakieComponentyPokazywacz(){
    const {pokazywanie,onPokazywanieChange}=useContext(GlobalContext)
    return (
        <div style={{float:"right"}}>
            Sortowanie
            <select id={'cat'} onChange={onPokazywanieChange}
                    style={{color: 'red', border: '1px solid black', margin: '2px'}}>
                <option value="Events">Events</option>
                <option value="GlobalInfo">GlobalInfo</option>
                <option value="User">Moja strona</option>

            </select>
        </div>
    )
}