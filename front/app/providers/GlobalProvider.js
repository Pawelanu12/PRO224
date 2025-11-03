'use client'


import {createContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import s from "@/app/data/sprawnosci.json"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [loading,setLoading] = useState(true);
    const [user, setUser] = useState({})
    const [edit,setEdit] = useState({})
    const router = useRouter()
    const logOut = () => {
        localStorage.clear()
        setUser({})
        if(window.location.pathname.startsWith("/profil")
            ||window.location.pathname.startsWith("/forum")
            ||window.location.pathname.startsWith("/admin")
            ||window.location.pathname.startsWith("/czat"))
            router.replace("/login")
    }
    const replaceClick=(e,href)=>{
        if(e)
            e.preventDefault()
        router.push(href)
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
                        localStorage.setItem("token",r.token)
                        router.replace("/czat")
                    }

                })
                .then(
                    ()=>get_me()
                )
                .catch(err=>console.log(err))
        }
        f(values)
        // router.replace("/czat")
    }
    const get_me=()=>{
        const me=async ()=>
        {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/me`,
                { method:"GET",
                    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
                })
                .then(res=>res.json())
                .then(r=>{
                    console.log(r);
                    if(r.error)
                        logOut()
                    else
                        setUser(r)

                })
                .catch(err=>console.log(err))
        }
        me()
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

    useEffect(()=>{
        console.log("get_me")
        console.log(window.location.pathname)
        // if(window.location.pathname.startsWith("/profil")
        //     ||window.location.pathname.startsWith("/forum")
        //     ||window.location.pathname.startsWith("/admin")
        //     ||window.location.pathname.startsWith("/czat")
        //     ||window.location.pathname.startsWith("/sprawnosci")
        //     ||window.location.pathname.startsWith("/wydarzenia")
        //     ||window.location.pathname.startsWith("/kontakt")
        // )
        // {
            get_me()
        // }
    },[])

    return (
        <GlobalContext.Provider value={{router,register,loading,setLoading,edit,setEdit,
            replaceClick,logIn,user,logOut}}>{children}</GlobalContext.Provider>
    )
};