'use client'


import {createContext, useContext, useRef, useState} from "react";
import s from "@/app/data/sprawnosci.json"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const SprawnoscContext = createContext();

export default function SprawnoscProvider({ children }) {
    const [sprawnosci, setSprawnosci] = useState(s);
    const [sprawnosciPosortowane, setSprawnosciPosortowane] = useState(s);
    const {setLoading}=useContext(GlobalContext)
    const input=useRef(null)

    const getSprawnosci = () => {
        const get=async ()=>{
            setLoading(true)
                await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc`,{
                method:"GET",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"}
            })
                    .then(res=> res.json())
                    .then(res=> {
                    console.log(res)
                        if(Array.isArray(res)){
                            setSprawnosci(res)
                            setSprawnosciPosortowane(res)
                        }
                        else
                            console.log(res)
                })
                .catch(err=>console.log(err))
                .finally(()=>setLoading(false))
        }
        get()
    }

    const logInput=()=>{
        if(input&&input.current&&input.current.value&&input.current.value.length>0){
            setSprawnosciPosortowane(sprawnosci.filter(s=>s.nazwa.startsWith(input.current.value)))
        }
        else{
            setSprawnosciPosortowane(sprawnosci)
        }
    }

    return (
        <SprawnoscContext.Provider value={{input,getSprawnosci,sprawnosci,sprawnosciPosortowane,
            logInput}}>{children}</SprawnoscContext.Provider>
    )
};