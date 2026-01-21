'use client'


import {createContext, useContext, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export const WydarzeniaContext = createContext();

export default function EventProvider({ children }) {
    const [wydarzenia, setWydarzenia] = useState([]);
    const [nazwa, setNazwa] = useState("");
    const [data, setData] = useState("");
    const [typ, setTyp] = useState("Typ wydarzenia");
    const {fetchWithAuth,pushClick}=useContext(GlobalContext);



    const getWydarzenia = () => {
        const get=async ()=>{
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
        }
        get()
        // console.log("cat")
    }

    const dodajUczestnictwo = (wydarzenieId,uzytkownikId) => {
        console.log(wydarzenieId)
        console.log(uzytkownikId)
        const add=async ()=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uczestnictwo`,{
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

    const editWydarzenie = (id,values) => {
        const edit=async (id,values)=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie/${id}`,{
                method:"PUT",
                credentials: "include",
                body:values
            })
                .catch(err=>console.log(err))
        }
        edit(id,values)
    }

    const deleteWydarzenie = (id) => {
      console.log(id)
        const d=async (id)=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie/${id}`,{
                method:"DELETE",
                credentials: "include",
            })
                .then(()=>pushClick("","/events"))
                .catch(err=>console.log(err))
        }
        d(id)
    }

    return (
        <WydarzeniaContext.Provider value={{
            getWydarzenia,
            dodajUczestnictwo,
            wydarzenia,
            setWydarzenia,
            nazwa,
            data,
            typ,
            setTyp,
            setNazwa,
            setData,
            editWydarzenie,
            deleteWydarzenie
        }}>

            {children}</WydarzeniaContext.Provider>
    )
};