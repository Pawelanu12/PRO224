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
                <option value="Kwoty">kwoty usera</option>
                <option value="Users">Wszystkie usery</option>
                <option value="LogIn">Log In</option>
                <option value="Sprawnosci">Sprawnosci</option>
                <option value="AddUser">Sign In</option>
                <option value="AddKwota">chcę zaplacić</option>


            </select>
        </div>
    )
}