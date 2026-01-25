'use client'


import {createContext, useContext, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const SprawnoscContext = createContext();

export default function AchievementProvider({ children }) {
    const [sprawnosci, setSprawnosci] = useState([]);
    const [sprawnosciPosortowane, setSprawnosciPosortowane] = useState([]);
    const {fetchWithAuth,pushClick}=useContext(GlobalContext)
    const input=useRef(null)
    const [zdobyteSprawnosci,setZdobyteSprawnosci] = useState([]);
    const [sprawnosc, setSprawnosc] = useState({});

    const getSprawnosci = () => {
        const get=async ()=>{
                await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc`,{
                method:"GET",
                credentials: "include",
                headers: {"Content-Type": "application/json"}
            })
                    .then(res=> res.json())
                    .then(res=> {
                        if(Array.isArray(res)){
                            setSprawnosci(res)
                            setSprawnosciPosortowane(res)
                        }
                })
                .catch(err=>console.log(err))
        }
        get()
    }

    const getZdobyteSprawnosci=(id)=>{
        const getSprawnosci=async (id)=>
        {

            fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/zdobytaSprawnosc/uzytkownik/${id}`,
                { method:"GET",
                    credentials: "include",
                })
                .then(res=>res.json())
                .then(res=>{
                    if(Array.isArray(res)){
                        setZdobyteSprawnosci(res)
                        // setSprawnosciPosortowane(res)
                    }
                })
                .catch(err=>console.log(err))
        }
        getSprawnosci(id)
    }


    const logInput=(zdobyte=false)=> {
        if (!zdobyte) {
            if (input && input.current && input.current.value && input.current.value.length > 0) {
                setSprawnosciPosortowane(sprawnosci.filter(s => s.nazwa.toUpperCase().startsWith(input.current.value.toUpperCase())))
            } else {
                setSprawnosciPosortowane(sprawnosci)
            }
        }
        else{
            if (input && input.current && input.current.value && input.current.value.length > 0) {
                setSprawnosciPosortowane(zdobyteSprawnosci.filter(s => s.nazwa.toUpperCase().startsWith(input.current.value.toUpperCase())))
            } else {
                setSprawnosciPosortowane(zdobyteSprawnosci)
            }
        }
    }

    const gainAchievement = (body) => {
        const gain=async(body)=>{
            fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/zdobytaSprawnosc`,
                { method:"POST",
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify(body),
                    credentials: "include",
                })
                .then(res=>res.json())
                .then(res=>{
                    setZdobyteSprawnosci(prev=>[...prev,res])
                })
                .catch(err=>console.log(err))
        }
        gain(body)
    }

    const deleteAchievement = (id) => {
        const del=async(id)=>{
            fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/zdobytaSprawnosc/${id}`,
                { method:"DELETE",
                    credentials: "include",
                })
                .then(res=>{if(res.error)alert("wystapil blad")})
                .then(()=>setZdobyteSprawnosci(prev=>prev.filter(z=>z.id!==id)))
                .catch(err=>console.log(err))
        }
        del(id)
    }

    const editSprawnosci = (id,values) => {
        const edit=async (id,values)=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc/${id}`,{
                method:"PUT",
                credentials: "include",
                body:values
            })
                .then(res=>res.json())
                .then(res=>{
                    if(!res.error)
                        setSprawnosc(res)
                })
                .catch(err=>console.log(err))
        }
        edit(id,values)
    }

    const deleteSprawnosci = (id)=>{
        const usun=async (id)=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc/${id}`, {
                method: "Delete",
                credentials: "include"
            })
                .then(res=>{
                    if(res.ok)
                        pushClick("","/achievements")
                })

        }
        usun(id)
    }

    return (
        <SprawnoscContext.Provider value={{zdobyteSprawnosci,
            getZdobyteSprawnosci,
            input,
            deleteSprawnosci,
            getSprawnosci,
            sprawnosci,
            sprawnosciPosortowane,
            logInput,
            deleteAchievement,
            gainAchievement,
            editSprawnosci,
        sprawnosc,
        setSprawnosc}}>{children}</SprawnoscContext.Provider>
    )
};