'use client'


import {createContext, useContext, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const SprawnoscContext = createContext();

export default function AchievementProvider({ children }) {
    const [sprawnosci, setSprawnosci] = useState([]);
    const [sprawnosciPosortowane, setSprawnosciPosortowane] = useState([]);
    const {setLoading}=useContext(GlobalContext)
    const input=useRef(null)
    const [zdobyteSprawnosci,setZdobyteSprawnosci] = useState([]);

    const getSprawnosci = () => {
        const get=async ()=>{
            setLoading(true)
                await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc`,{
                method:"GET",
                credentials: "include",
                headers: {"Content-Type": "application/json"}
            })
                    .then(res=> res.json())
                    .then(res=> {
                    console.log(res)
                        if(Array.isArray(res)){
                            setSprawnosci(res)
                            setSprawnosciPosortowane(res)
                        }
                })
                .catch(err=>console.log(err))
                .finally(()=>setLoading(false))
        }
        get()
    }

    const getZdobyteSprawnosci=(id)=>{
        const getSprawnosci=async (id)=>
        console.log(id)
        {
        setLoading(true)

            console.log(id)
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/zdobytaSprawnosc/uzytkownik/${id}`,
                { method:"GET",
                    credentials: "include",
                })
                .then(res=>res.json())
                .then(res=>{
                    console.log(res);
                    if(Array.isArray(res)){
                        setZdobyteSprawnosci(res)
                        setSprawnosciPosortowane(res)
                    }
                })
                .catch(err=>console.log(err))
                .finally(setLoading(false))
        }
        getSprawnosci(id)
    }


    const logInput=(zdobyte=false)=> {
        if (!zdobyte) {
            if (input && input.current && input.current.value && input.current.value.length > 0) {
                setSprawnosciPosortowane(sprawnosci.filter(s => s.nazwa.startsWith(input.current.value)))
            } else {
                setSprawnosciPosortowane(sprawnosci)
            }
        }
        else{
            if (input && input.current && input.current.value && input.current.value.length > 0) {
                setSprawnosciPosortowane(zdobyteSprawnosci.filter(s => s.nazwa.startsWith(input.current.value)))
            } else {
                setSprawnosciPosortowane(zdobyteSprawnosci)
            }
        }
    }

    const gainAchievement = (body) => {
        console.log(body)
        const gain=async(body)=>{
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/zdobytaSprawnosc`,
                { method:"POST",
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify(body),
                    credentials: "include",
                })
                .then(res=>res.json())
                .then(res=>{
                    console.log(res);
                        setZdobyteSprawnosci(prev=>[...prev,res])
                })
                .catch(err=>console.log(err))
                .finally(setLoading(false))
        }
        gain(body)
    }

    const deleteAchievement = (id) => {
        console.log(id)
        const del=async(id)=>{
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/zdobytaSprawnosc/${id}`,
                { method:"DELETE",
                    credentials: "include",
                })
                .then(res=>{if(res.error)alert("wystapil blad")})
                .then(()=>setZdobyteSprawnosci(prev=>prev.filter(z=>z.id!==id)))
                .catch(err=>console.log(err))
                .finally(setLoading(false))
        }
        del(id)
    }

    return (
        <SprawnoscContext.Provider value={{zdobyteSprawnosci,
            getZdobyteSprawnosci,
            input,
            getSprawnosci,
            sprawnosci,
            sprawnosciPosortowane,
            logInput,
            deleteAchievement,
            gainAchievement}}>{children}</SprawnoscContext.Provider>
    )
};