'use client'


import {createContext, useState} from "react";
import {useRouter} from "next/navigation";
import s from "@/app/data/sprawnosci.json"
export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [zdobyteSprawnosci,setZdobyteSprawnosci] = useState(s.slice(0,5));
    const [cat, setCat] = useState("qwe")
    const [user, setUser] = useState({
        ikona:"../images/ikona.png",
        imie:"Jan",
        nazwisko:"Kowlski",
        login:"fosfr",
        data_urodzenia:"2025-08-07",
        gromada:"gromada 1",
        data_dolaczenia_do_gromady:"2025-08-07"
    })
    const router = useRouter()
const t=["w,","e"]
    const logOut = () => {
        localStorage.clear()
        setUser({})
        router.replace("/login")
    }
    const replaceClick=(e,href)=>{
        e.preventDefault()
        router.replace(href)
    }
    const logIn=(values)=>{
        router.replace("/czat")
    }

    return (
        <GlobalContext.Provider value={{cat,setCat,router,
            replaceClick,logIn,user,setUser,logOut,zdobyteSprawnosci}}>{children}</GlobalContext.Provider>
    )
};