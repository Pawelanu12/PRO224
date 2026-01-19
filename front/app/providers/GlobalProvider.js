'use client'


import {createContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [loading,setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const [edit,setEdit] = useState({})
    const [dzieci,setDzieci] = useState(null);
    const router = useRouter()
    async function fetchWithAuth(url, options = {}) {
        const res = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {
                ...options.headers,
            },
        })
        if (res.status === 401 || res.status === 403) {
            await logOut()
            throw new Error("Token wygasł")
        }

        return res
    }
    const logOut = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        signOut({callbackUrl:"/login"});


    };
    const pushClick=(e,href)=>{
        if(e)
            e.preventDefault()
        router.push(href)
    }
    const logIn=(values)=>{
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

                .catch(err=>alert("wystąpił błąd przy logowaniu"))
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
        const f=async (values)=>{
           const val={
               login:values.login,
               haslo:values.haslo,
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
                    if(r.message==="User registered successfully"){
                        router.replace("/login")
                        alert("konto stworzone poprawne")
                    }
                    else if(r.message.includes("Duplicate"))
                        alert("email musi być unikatowy")
                    else
                        alert(r.message)
                })
                .catch(err=>console.log(err))
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
                .then(()=>{
                    get_me()  // fetch user info z cookie
                });


        } catch (err) {
            console.log(err);
        }
    };
    const editUser=(id,values)=>{
        const f=async (id,values)=>{
            await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/me`,
                {
                    method:"PUT",
                    headers:{'Content-type':"application/json"},
                    credentials: "include",
                    body:JSON.stringify(
                        values)
                })
                .then(res=>res.json())
                .then(r=>{
                    console.log(r)
                    if(r.message&&r.message.includes("Duplicate"))
                        alert('email musi byc unikatowy')
                    if(r&&r.login)
                        setUser(r);
                })
        }
        f(id,values)
    }
    const changePassword=(values)=>{
        const f=async (values)=>{
            await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/me/password`,
                {
                    method:"PUT",
                    headers:{'Content-type':"application/json"},
                    credentials: "include",
                    body:JSON.stringify(
                        values)
                })
        }
        f(values)
    }

    useEffect(()=>{
            get_me()
    },[])

    useEffect(() => {
        if(loading)return
        if(!user){
            const path=window.location.pathname
            console.log(path)
            if(!(path==="/login"||path==="/rejestracja"||path==="/"||path==="/kontakt"
                ||path.startsWith("/sprawnosci")||path.startsWith("/wydarzenia")))
            router.replace("/login")
        }
        if(user?.typUzytkownika==="DEFAULT")
            alert("poczekaj kiedy Drużynowy przydzieli ciebie typ")
    }, [user,loading]);


    const getDzieci=() => {
        const getUsers=async ()=>{
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/children?parentId1=${user.id}`,
                {
                    method:"GET",
                    credentials: "include",
                })
                .then(res=>res.json())
                .then(r=>{
                    console.log(r)
                    if(Array.isArray(r))
                        setDzieci(r)
                })
        }
        getUsers()
    }
    return (
        <GlobalContext.Provider value={{router,
            register,
            loading,
            setLoading,
            edit,
            setEdit,
            get_me,
            pushClick,
            logIn,
            user,
            logOut,
            googleLogin,
            editUser,
            fetchWithAuth,
            changePassword,
            getDzieci,
        dzieci}}>{children}</GlobalContext.Provider>
    )
};