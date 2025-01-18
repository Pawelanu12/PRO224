
'use client'



import {GlobalContext} from "@/app/providers/GlobalProvider";
import {useContext} from "react";
import {FaTrash} from "react-icons/fa";

export default function User({userq=null}) {
    const {pokazywanieUsera, users,user,deleteFromList, zmienPokazywanegoUsera,setList,
        onPokazywanieChange,zmienEdycje} = useContext(GlobalContext)
    let userw
    userq!=null ? userw = userq : userw =user
    if (!userw) return (<div>user nie znalażony</div>)
    const getTypUzytkownika=(typUzytkownikaId)=>{
        switch (typUzytkownikaId){
            case 1:
                return "Admin";
            case 2:
                return "Zuch"
            default:
                return "unAuthorised"
        }
    }

    return (

        <div style={{background: "gold", justifyContent: "center"}}>
            {user.typUzytkownikaId === 1 && <FaTrash onClick={() => deleteFromList(userw.id, "User")}/>}
            {(user.typUzytkownikaId === 1) &&
                <button onClick={() => {
                    setList("User Achivement", userw.id);
                    onPokazywanieChange({target: {value: "MySprawnosci"}})
                }}
                        style={{backgroundColor: "red"}}>
                    Zobacz otrzymane achievementy</button>}
            <p onClick={() => {
                zmienPokazywanegoUsera(userw.id);
                onPokazywanieChange("User")
            }}>Imie: {userw.imie}</p>
            <p>Nazwisko: {userw.nazwisko}</p>
            <p>Login: {userw.login}</p>
            {userw.szostkaId && <p>Szostka: {userw.szostkaId}</p>}
            <p>Email: {userw.email}</p>
            <p>Numer telefonu: {userw.nrTelefonu}</p>
            <p>Data urodzenia: {userw.dataUrodzenia}</p>
            <p>type of User:{getTypUzytkownika(userw.typUzytkownikaId)}</p>
            {/*{userw.typUzytkownika === "Zuch" && <p>Data dołaczenia do gromady: {userw.dataDolaczeniaDoGromady}</p>}*/}
            <button onClick={() => onPokazywanieChange({target: {value: "EditHaslo"}})}>Zmien haslo</button>
            {/*{userw.typUzytkownika === "Rodzic" && <p style={{textAlign: "center"}}>dzieci</p>}*/}
            {/*{userw.typUzytkownika === "Zuch" && <p style={{textAlign: "center"}}>rodzice</p>}*/}


            {/*{userw.typUzytkownika === "Zuch"&&userw.rodzice && userw.rodzice.map(r =>*/}
            {/*    <div key={r}>*/}
            {/*        <button key={r} onClick={() =>{console.log(r); zmienPokazywanegoUsera(r);onPokazywanieChange("User")}}>Pokaz*/}
            {/*            rodzica {users.find(user => user.id === r).imie}</button>*/}
            {/*        <br/></div>)}*/}
            {/*{userw.typUzytkownika === "Rodzic" && userw.dzieci&& userw.dzieci.map(r =>*/}
            {/*    (<button key={r} onClick={() => zmienPokazywanegoUsera(r)}>Pokaz*/}
            {/*        dziecko {users.find(user => user.id === r).imie}</button>))}<br/>*/}
            {(user.typUzytkownikaId === 1 || user === userw) && <div>
                <button onClick={() => zmienEdycje(userw)}>Edit</button>
                <br/>


            </div>}
            {user.typUzytkownikaId === 1 && <button style={{backgroundColor: "red"}} onClick={() => {
                setList("User Achivement", userw.id)
                onPokazywanieChange({target: {value: "UserAchivement"}})
            }}>
                Dodaj nowy achievemnt do tego usera
            </button>}

        </div>

    )
}
