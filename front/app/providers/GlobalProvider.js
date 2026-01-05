'use client'


import {createContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [loading,setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const [edit,setEdit] = useState({})
    const router = useRouter()

    const logOut = async (e) => {
        console.log(user)
        signOut({ redirect: false });

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
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
                .then(()=>{router.replace("/forum")})

                .catch(err=>console.log(err))
        }
        f(values)
        // router.replace("/czat")
    }
    const get_me=()=>{
        const me=async ()=>
        {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/me`,
                    { credentials: "include" }
                );

                if (!res.ok) {
                    setUser(null);
                    setLoading(false)
                } else {
                    const data = await res.json();
                    setUser(data);
                    setLoading(false)
                }
            } catch {
                setUser(null);
                setLoading(false)
            }
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
    const googleLogin = async (idToken,expires) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",   // kluczowe
                body: JSON.stringify({ idToken })
            })
                .then(()=>{
                    get_me()  // fetch user info z cookie
                });


        } catch (err) {
            console.log(err);
        }
    };


    useEffect(()=>{
        const init= async ()=>{
            get_me()

        }
        init()
    },[])
    useEffect(() => {
     console.log(loading)
        if(loading)return
        if(!user)router.replace("/login")
    }, [user,loading]);

    return (
        <GlobalContext.Provider value={{router,register,loading,setLoading,edit,setEdit,get_me,
            replaceClick,logIn,user,logOut,googleLogin}}>{children}</GlobalContext.Provider>
    )
};