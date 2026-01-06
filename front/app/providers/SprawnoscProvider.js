'use client'


import {createContext, useContext, useRef, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const SprawnoscContext = createContext();

export default function SprawnoscProvider({ children }) {
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

    return (
        <SprawnoscContext.Provider value={{zdobyteSprawnosci,getZdobyteSprawnosci,input,getSprawnosci,sprawnosci,sprawnosciPosortowane,
            logInput}}>{children}</SprawnoscContext.Provider>
    )
};