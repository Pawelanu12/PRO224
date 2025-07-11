<<<<<<< HEAD
'use client'


import {createContext, useRef, useState} from "react";
import s from "@/app/data/sprawnosci.json"
export const SprawnoscContext = createContext();

export default function SprawnoscProvider({ children }) {
    const [sprawnosci, setSprawnosci] = useState(s);
    const [sprawnosciPosortowane, setSprawnosciPosortowane] = useState(s);
    const input=useRef(null)

    return (
        <SprawnoscContext.Provider value={{input,sprawnosci,setSprawnosci,sprawnosciPosortowane, setSprawnosciPosortowane}}>{children}</SprawnoscContext.Provider>
    )
=======
'use client'


import {createContext, useRef, useState} from "react";
import s from "@/app/data/sprawnosci.json"
export const SprawnoscContext = createContext();

export default function SprawnoscProvider({ children }) {
    const [sprawnosci, setSprawnosci] = useState(s);
    const [sprawnosciPosortowane, setSprawnosciPosortowane] = useState(s);
    const input=useRef(null)

    return (
        <SprawnoscContext.Provider value={{input,sprawnosci,setSprawnosci,sprawnosciPosortowane, setSprawnosciPosortowane}}>{children}</SprawnoscContext.Provider>
    )
>>>>>>> 4dd7db782ce30e6bc8496988371a43292f819c4b
};