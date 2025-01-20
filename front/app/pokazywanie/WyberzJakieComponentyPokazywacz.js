
'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function WyberzJakieComponentyPokazywacz(){
    const {user,pokazywanie,onPokazywanieChange}=useContext(GlobalContext)
   // console.log(user)
    return (
        <div style={{float:"right"}}>

            {user&&
                <select id={'cat'} onClick={onPokazywanieChange}
                        style={{color: 'red', border: '1px solid black', margin: '2px'}}>
                    <option value="User">Moja strona</option>
                    <option value="Events">Events</option>
                    <option value="MyEvents">Eventy w których jestem uczęstnikiem</option>
                    <option value="GlobalInfo">GlobalInfo</option>
                    {user.typUzytkownikaId === 1 && <option value="Kwoty">Wszystkie paymenty</option>}
                    <option value="Users">Wszystkie usery</option>
                    <option value="Sprawnosci">Sprawnosci</option>
                    <option value="MySprawnosci">pokaż moi Sprawnosci</option>
                    <option value="Wplaty usera">pokaż moi platnosci</option>
                    {(user.typUzytkownikaId === 1 && <option value="AddKwota">dodaj plate do usera</option>)}
                    <option value="LogOut">Log out</option>
                </select>
            }
            {!user &&
                <select id={'cat1'} onChange={onPokazywanieChange}
                        style={{color: 'red', border: '1px solid black', margin: '2px'}}>
                    <option value="LogIn">Log In</option>
                    <option value="GlobalInfo">GlobalInfo</option>
                    <option value="Events">Events</option>
                    <option value="AddUser">Sign In</option>

                </select>
            }
        </div>
    )
}
