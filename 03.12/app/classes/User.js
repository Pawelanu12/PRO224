'use client'



import {GlobalContext} from "@/app/providers/GlobalProvider";
import {useContext} from "react";
import {FaTrash} from "react-icons/fa";

export default function User({userq=null}) {
    const {pokazywanieUsera, users,user,deleteFromList, zmienPokazywanegoUsera,onPokazywanieChange} = useContext(GlobalContext)
    let userw
    userq!=null ? userw = userq : userw = users.filter(u => u.id === pokazywanieUsera)[0]
    if (!userw) return (<div>user nie znalażony</div>)
    return (

        <div style={{background: "gold", justifyContent: "center"}}>
            {user.typUzytkownika==="Admin"&& <FaTrash onClick={()=>deleteFromList(userw.id,"User")}/>}

            <p>Imie: {userw.imie}</p>
            <p>Nazwisko: {userw.nazwisko}</p>
            <p>Login: {userw.login}</p>
            {userw.szostka && <p>Szostka: {userw.szostka}</p>}
            <p>Email: {userw.email}</p>
            <p>Numer telefonu: {userw.numerTelefonu}</p>
            <p>Data urodzenia: {userw.dataUrodzenia}</p>
            {userw.typUzytkownika === "Zuch" && <p>Data dołaczenia do gromady: {userw.dataDolaczeniaDoGromady}</p>}
            {userw.typUzytkownika === "Rodzic" && <p style={{textAlign: "center"}}>dzieci</p>}
            {userw.typUzytkownika === "Zuch" && <p style={{textAlign: "center"}}>rodzice</p>}


            {userw.typUzytkownika === "Zuch" && userw.rodzice.map(r =>
                <div key={r}>
                    <button key={r} onClick={() =>{ zmienPokazywanegoUsera(r);onPokazywanieChange("User")}}>Pokaz
                        rodzica {users.find(user => user.id === r).imie}</button>
                    <br/></div>)}
            {userw.typUzytkownika === "Rodzic" && userw.dzieci.map(r =>
                (<button key={r} onClick={() => zmienPokazywanegoUsera(r)}>Pokaz
                    dziecko {users.find(user => user.id === r).imie}</button>))}
        </div>
    )
}

