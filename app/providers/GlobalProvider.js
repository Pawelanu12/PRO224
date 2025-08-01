'use client'


import {createContext, useState} from "react";
import {useRouter} from "next/navigation";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [cat, setCat] = useState("qwe")

    const router = useRouter()

    const replaceClick=(e,href)=>{
        e.preventDefault()
        // setEtap("email")
        router.replace(href)
    }

    const [etap,setEtap]=useState("email")
    return (
        <GlobalContext.Provider value={{cat,setCat,router,replaceClick,etap,setEtap}}>{children}</GlobalContext.Provider>
    )
};