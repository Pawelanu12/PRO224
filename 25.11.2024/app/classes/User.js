'use client'



import {GlobalContext} from "@/app/providers/GlobalProvider";
import {useContext} from "react";

export default function User(){
    const {pokazywanieUsera,users,zmienPokazywanegoUsera}=useContext(GlobalContext)
    const user=users.filter(u=>u.id===pokazywanieUsera)[0]
    console.log(users)
    console.log(user)
    if(!user)return(<div>user nie znalażony</div>)
    return(
        <div style={{background:"gold",justifyContent:"center"}}>
            <p>Imie: {user.imie}</p>
            <p>Nazwisko: {user.nazwisko}</p>
            <p>Login: {user.login}</p>
            <p>Email: {user.email}</p>
            <p>Numer telefonu: {user.numerTelefonu}</p>
            <p>Data urodzenia: {user.dataUrodzenia}</p>
            {user.typUzytkownika===3 &&<p>Data dołaczenia do gromady: {user.dataDolaczeniaDoGromady}</p>}
            {user.typUzytkownika===2 &&<p style={{textAlign:"center"}}>dzieci</p>}
            {user.typUzytkownika===3 &&<p style={{textAlign:"center"}}>rodzice</p>}


            {user.typUzytkownika===3 &&user.rodzice.map(r=>
            <div key={r}><button key={r} onClick={()=>zmienPokazywanegoUsera(r)}>Pokaz rodzica {users.find(user=>user.id===r).imie}</button><br/></div> )}
            {user.typUzytkownika===2 &&user.dzieci.map(r=>
            (<button key={r} onClick={()=>zmienPokazywanegoUsera(r)}>Pokaz dziecko {users.find(user=>user.id===r).imie}</button>) )}
        </div>
    )
}