// app/providers/ColorProvider.js
"use client";

import React, {createContext, useContext, useState} from "react";
import forEvent from "../data/forEvent.json";
import forGlobalInfo from "../data/forGlobalInfo.json";
import forUser from "../data/forUser.json";


export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [events, setEvents] = useState(forEvent);
    const [globalInfo, setGlobalInfo] = useState(forGlobalInfo);
    const [pokazywanie,setPokazywanie]=useState("Events")
    const [pokazywanieUsera,setPokazywanieUsera]=useState(1)
    const [users,setUsers]=useState(forUser)
    const [componentsDodawania,setComponentsDodawania]=useState(1)

    //new globalInfo


    //WyberzJakieComponentyPokazywacz
    const onPokazywanieChange=(cat)=>{
        // console.log(cat.target.value)
        setPokazywanie(cat.target.value)
        zmienPokazywanegoUsera(users[0].id)
        // console.log(pokazywanie)
    }
    const zmienPokazywanegoUsera=id=>{
        setPokazywanieUsera(id)
    }

    return (
        <GlobalContext.Provider value={{ events, setEvents ,pokazywanie,onPokazywanieChange
        ,globalInfo,setGlobalInfo,pokazywanieUsera,users,zmienPokazywanegoUsera,componentsDodawania,setComponentsDodawania,setPokazywanie}}>
            {children}
        </GlobalContext.Provider>
    );
}