// app/providers/ColorProvider.js
"use client";

import React, {createContext, useContext, useState} from "react";
import forEvent from "../data/forEvent.json";
import forGlobalInfo from "../data/forGlobalInfo.json";
import forUser from "../data/forUser.json";
import forKwoty from "../data/forKwoty.json";
import forSprawnosc from "../data/forSprawnosc.json"


export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [events, setEvents] = useState(forEvent);
    const [globalInfo, setGlobalInfo] = useState(forGlobalInfo);
    const [pokazywanie,setPokazywanie]=useState("Events")
    const [pokazywanieUsera,setPokazywanieUsera]=useState(1)
    const [users,setUsers]=useState(forUser)
    const [sprawnosci,setSprawnosci]=useState(forSprawnosc)
    const [user,setUser]=useState(forUser[0])
    const [componentsDodawania,setComponentsDodawania]=useState(1)
    const [kwoty,setKwoty]=useState(forKwoty)

    //new globalInfo


const logIn=(values)=>{
       const logUser= users.filter(u=>u.login===values.login&&u.haslo===values.password)
    if(logUser.length){
       setUser(logUser[0]);
       setPokazywanieUsera(logUser[0].id)
        setPokazywanie("User")
        return true
    }
    return false


}
    const onPokazywanieChange=(cat)=>{
        if(cat==="User")
            setPokazywanie(cat)
        else {
            // console.log(cat.target.value)
            setPokazywanie(cat.target.value)
            if (cat.target.value === "User")
                zmienPokazywanegoUsera(user.id)
        }
        // console.log(pokazywanie)
    }
    const zmienPokazywanegoUsera=id=>{
        setPokazywanieUsera(id)
    }
    const addDoListy=(value,type)=>{
        switch (type){
            case "GlobalInformation":
                setGlobalInfo([...globalInfo,value]);
                break;
            case "Event":
                setEvents([...events,value]);
                break;
            case "Kwota":
                setKwoty([...kwoty,value]);
                break;
            case "Sprawnosc":
                setSprawnosci([...sprawnosci,value]);
                break;
            case "User":
                setUsers([...users,value]);
                break;
            default:
                alert(type)
        }
    }
    const deleteFromList=(id,type)=>{
        console.log(id)
        switch (type){
            case "GlobalInformation":
                setGlobalInfo(globalInfo.filter(clas=>clas.id!==id));
                break;
            case "Event":
                setEvents(events.filter(clas=>clas.id!==id));
                break;
            case "Kwota":
                setKwoty(kwoty.filter(clas=>clas.id!==id));
                break;
            case "Sprawnosc":
                setSprawnosci(sprawnosci.filter(clas=>clas.id!==id));
                break;
            case "User":
                const userDoUsuniecia=users.find(user=>user.id===id)
                if(!userDoUsuniecia)
                    console.log("nie ma takiego usera")
                if(userDoUsuniecia.typUzytkownika==="Admin") {
                    alert("nie można usuwać admina");
                    break;
                }
               const newUsers=users
                console.log(newUsers)

                   newUsers.map(u=>{
                       console.log(u.dzieci)
                       u.rodzice= u.rodzice.filter(clas=>clas!==id)
                       u.dzieci= u.dzieci.filter(clas=>(clas!==id))
               })
                console.log(newUsers)

                setUsers(   newUsers.filter(clas=>clas.id!==id));
                break;
            default:
                alert(type)
        }
    }

    return (
        <GlobalContext.Provider value={{addDoListy,deleteFromList, events ,pokazywanie,onPokazywanieChange
        ,globalInfo,pokazywanieUsera,users,zmienPokazywanegoUsera,
            componentsDodawania,setComponentsDodawania,setPokazywanie,sprawnosci,
            kwoty,user,setUser,logIn}}>
            {children}
        </GlobalContext.Provider>
    );
}