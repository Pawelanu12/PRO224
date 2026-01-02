'use client'


import {createContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import s from "@/app/data/sprawnosci.json"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {signOut} from "next-auth/react";
export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [loading,setLoading] = useState(true);
    const [user, setUser] = useState({})
    const [edit,setEdit] = useState({})
    const router = useRouter()

    const logOut = async (e) => {
        console.log(user)
        // 1️⃣ Logout z NextAuth (Google)
        signOut({ redirect: false });
        console.log(user)

        // 2️⃣ Logout z własnego backendu
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        // 3️⃣ Wyczyść stan w frontendzie
        setUser({});
        replaceClick(e,"/login")
    };
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
                    credentials: "include",
                    body:JSON.stringify(
                        values)
                })
                .then(()=>{
                    get_me()
        }
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
                    credentials: "include"
                })
                .then(res=>res.json())
                .then(r=>{
                    console.log(r);
                    if(r.error)
                        logOut()
                    else{
                        setUser(r)
                        replaceClick(null, "/forum")
                    }

                })
                .catch(err=>console.log(err))
        }
        me()
    }
    const register=(values)=>{
        alert(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/register`)
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
                    alert(r)
                    if(r.message==="User registered successfully"){
                        router.replace("/login")
                    }
                    else alert(r.message)
                })
                .catch(err=>alert(err))
        }
        f(values)
    }
    const googleLogin = async (idToken) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",   // kluczowe
                body: JSON.stringify({ idToken })
            })
                .then(()=>{ get_me();  // fetch user info z cookie
                    replaceClick("/forum");});


        } catch (err) {
            console.log(err);
        }
    };


    useEffect(()=>{
        console.log("get_me")
        // const interval=setInterval(get_me,3600000)

            get_me()
        // }
        // return(()=>clearInterval(interval))
    },[])

    return (
        <GlobalContext.Provider value={{router,register,loading,setLoading,edit,setEdit,get_me,
            replaceClick,logIn,user,logOut,googleLogin}}>{children}</GlobalContext.Provider>
    )
};