'use client'


import {createContext, useState} from "react";
import {useRouter} from "next/navigation";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [cat, setCat] = useState("qwe")
    const [user, setUser] = useState({})
    const router = useRouter()

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
            replaceClick,logIn,user,setUser,logOut}}>{children}</GlobalContext.Provider>
    )
};