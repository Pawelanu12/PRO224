'use client'


import {createContext, useContext, useRef, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export const WydarzeniaContext = createContext();

export default function WydarzeniaProvider({ children }) {
    const [wydarzenia, setWydarzenia] = useState([]);
    const [nazwa, setNazwa] = useState("");
    const [data, setData] = useState("");
    const [typ, setTyp] = useState("Typ wydarzenia");
    const {setLoading}=useContext(GlobalContext);



    const getWydarzenia = () => {
        const get=async ()=>{
            setLoading(true)
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie`,{
                method:"GET",
                credentials: "include",
                headers: {"Content-Type": "application/json"}
            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                    if(Array.isArray(res))
                        setWydarzenia(res)
                })
                .catch(err=>console.log(err))
                .finally(()=>{setLoading(false)})
        }
        get()
        // console.log("cat")
    }

    const dodajUczestnictwo = (wydarzenieId,uzytkownikId) => {
        console.log(wydarzenieId)
        console.log(uzytkownikId)
        const add=async ()=>{
            setLoading(true)
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uczestnictwo`,{
                method:"POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(
                    {uzytkownikId:uzytkownikId,wydarzenieId:wydarzenieId,uczestnictwo:false})

            })
                .then(res=>res.json())
                .then(res=> {
                 console.log(res)
                })
                .catch(err=>console.log(err))
        }
        add()
        // console.log("cat")
    }

    return (
        <WydarzeniaContext.Provider value={{getWydarzenia,dodajUczestnictwo,
            wydarzenia,setWydarzenia,nazwa,data,typ,setTyp,setNazwa,setData

        }}>

            {children}</WydarzeniaContext.Provider>
    )
};