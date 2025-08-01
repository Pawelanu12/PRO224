'use client'


import {createContext, useRef, useState} from "react";
import w from "@/app/data/wydarzenia.json"
export const WydarzeniaContext = createContext();

export default function WydarzeniaProvider({ children }) {
    const [wydarzenia, setWydarzenia] = useState(w);
    const [nazwa, setNazwa] = useState("");
    const [data, setData] = useState("");
    const [typ, setTyp] = useState("Typ wydarzenia");

    return (
        <WydarzeniaContext.Provider value={{
            wydarzenia,setWydarzenia,nazwa,data,typ,setTyp,setNazwa,setData

        }}>

            {children}</WydarzeniaContext.Provider>
    )
};