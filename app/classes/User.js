
'use client'



import {GlobalContext} from "@/app/providers/GlobalProvider";
import {useContext} from "react";
import {FaTrash} from "react-icons/fa";

export default function User({userq=null}) {
    const {user,deleteFromList, zmienPokazywanegoUsera,setList,
        onPokazywanieChange,zmienEdycje,users,pokazywanieUsera} = useContext(GlobalContext)
    let userw
    //console.log(pokazywanieUsera)
    // console.log(users.find(u=>u.id===pokazywanieUsera))
    userq!=null ? userw = userq : userw =users.find(u=>u.id===pokazywanieUsera)
    if (!userw) return (<div>user nie znalażony</div>)
    const getTypUzytkownika=(typUzytkownikaId)=>{
        switch (typUzytkownikaId){
            case 1:
                return "Admin";
            case 2:
                return "Zuch"
            case 3:
                return "Rodzic"
            case 4:
                return "Przyboczny"
            default:
                return "unAuthorised"
        }
    }
    let rodzic1Imie
    if(userw.rodzicId1)
         rodzic1Imie=(users.find(user => user.id === userw.rodzicId1)["imie"])
    let rodzic2Imie
    if(userw.rodzicId2)
        rodzic2Imie=(users.find(user => user.id === userw.rodzicId1)["imie"])
    return (

        <div style={{background: "gold", justifyContent: "center"}}>
            {user.typUzytkownikaId === 1 && <FaTrash onClick={() => deleteFromList(userw.id, "User")}/>}
            {(user.typUzytkownikaId === 1) &&
                <button onClick={() => {
                    setList("User Achivement", userw.id);
                    onPokazywanieChange({target: {value: "NotMySprawnosci"}})
                }}
                        style={{backgroundColor: "red"}}>
                    Zobacz otrzymane achievementy</button>}
            <p>Id: {userw.id}</p>
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
            <p>Data dołaczenia do gromady: {userw.dataDolaczeniaDoGromady}</p>
            {/*<button onClick={() => onPokazywanieChange({target: {value: "EditHaslo"}})}>Zmien haslo</button>*/}
            {/*{userw.typUzytkownika === "Rodzic" && <p style={{textAlign: "center"}}>dzieci</p>}*/}
            {userw.typUzytkownikaId === 2 && <p style={{textAlign: "center"}}>rodzice</p>}

            {userw.typUzytkownikaId === 2&&
                userw.rodzicId1&&<div>
                    <button  onClick={() =>{console.log(userw.rodzicId1);
                        zmienPokazywanegoUsera(userw.rodzicId1);onPokazywanieChange("User")}}>
                        Pokaz rodzica {rodzic1Imie} </button>
                    <br/>
                </div>}
            {/*{userw.typUzytkownika === "Rodzic" && userw.dzieci&& userw.dzieci.map(r =>*/}
            {/*    (<button key={r} onClick={() => zmienPokazywanegoUsera(r)}>Pokaz*/}
            {/*        dziecko {users.find(user => user.id === r).imie}</button>))}<br/>*/}
            {(user.typUzytkownikaId === 1 || user === userw) &&
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {user === userw&& <button style={{backgroundColor: "red"}} onClick={() => {
                        setList("User Achivement", userw.id);
                        onPokazywanieChange({target: {value: "Wplaty usera"}});
                    }}>Pokaż moi wplaty
                    </button>}

                    {user === userw&&<button style={{backgroundColor: "red"}} onClick={() =>
                        zmienEdycje(userw)}>Edit my profile
                    </button>}

                    {user.typUzytkownikaId === 1 &&  <button style={{backgroundColor: "red"}} onClick={() =>
                    {
                        onPokazywanieChange({target:{value:"EditProfileByAdmin"}});
                        zmienEdycje(userw);
                    }}>Edit profile as an Administrator
                    </button>}
                    {user.typUzytkownikaId === 1 && <button style={{backgroundColor: "red"}} onClick={() => {
                        setList("User Achivement", userw.id)
                        onPokazywanieChange({target: {value: "UserAchivement"}})
                    }}>
                        Dodaj nowy achievemnt do tego usera
                    </button>}
                </div>}


        </div>

    )
}
