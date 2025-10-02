'use client'


import {createContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import s from "@/app/data/sprawnosci.json"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [zdobyteSprawnosci,setZdobyteSprawnosci] = useState(s.slice(0,5));
    const [cat, setCat] = useState("qwe")
    const [token,setToken] = useState("");
    const [loading,setLoading] = useState(true);
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
    const logOut = () => {
        localStorage.clear()
        setUser({})
        setToken("")
        router.replace("/login")
    }
    const replaceClick=(e,href)=>{
        e.preventDefault()
        router.replace(href)
    }
    const logIn=(values)=>{
        console.log(values)
        const f=async (values)=>{
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/login`,
                {
                    method:"POST",
                    headers:{'Content-type':"application/json"},
                    body:JSON.stringify(
                        values)
                })
                .then(res=>res.json())
                .then(r=>{
                    console.log(r)
                    if(r.token){
                        setToken(r.token)
                        localStorage.setItem("token",r.token)
                        router.replace("/czat")

                    }
                    else alert(r.message)
                })
                .catch(err=>console.log(err))
        }
        f(values)
        // router.replace("/czat")
    }
    const register=(values)=>{
        const f=async (values)=>{
           const val={
               login:values.login,
               haslo:values.haslo,
               imie:"q",
               data_dolaczenia_do_gromada:new Date(),
               nazwisko:"q",
               email:values.email,
           }
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/register`,
                {
                    method:"POST",
                    headers:{'Content-type':"application/json"},
                    body:JSON.stringify(val)
                })
                .then(res=>res.json())
                .then(r=>{
                    console.log(r)
                    if(r.message==="User registered successfully"){
                        router.replace("/login")
                    }
                    else alert(r.message)
                })
                .catch(err=>console.log(err))
        }
        f(values)
    }
    useEffect(()=>setToken(localStorage.getItem("token"||"")),[])

    return (
        <GlobalContext.Provider value={{cat,setCat,router,register,token,loading,setLoading,
            replaceClick,logIn,user,setUser,logOut,zdobyteSprawnosci}}>{children}</GlobalContext.Provider>
    )
};