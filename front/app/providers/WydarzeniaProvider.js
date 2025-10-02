'use client'


import {createContext, useContext, useRef, useState} from "react";
import w from "@/app/data/wydarzenia.json"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const WydarzeniaContext = createContext();

export default function WydarzeniaProvider({ children }) {
    const [wydarzenia, setWydarzenia] = useState(w);
    const [nazwa, setNazwa] = useState("");
    const [data, setData] = useState("");
    const [typ, setTyp] = useState("Typ wydarzenia");
    const {setLoading}=useContext(GlobalContext);

    const getWydarzenia = () => {
        const get=async ()=>{
            setLoading(true)
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie`,{
                method:"GET",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"}
            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                    setWydarzenia(res)
                })
                .catch(err=>console.log(err))
                .finally(()=>setLoading(false))
        }
        get()
        // console.log("cat")
    }

    return (
        <WydarzeniaContext.Provider value={{
            wydarzenia,setWydarzenia,nazwa,data,typ,setTyp,setNazwa,setData

        }}>

            {children}</WydarzeniaContext.Provider>
    )
};