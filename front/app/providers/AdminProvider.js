'use client'


import {createContext, useContext, useRef, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const AdminContext = createContext();

export default function AdminProvider({ children }) {

    const addSprawnosci = (values) => {
        const add=async (values)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc`,{
                method:"POST",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                body:values
            })
                .then(res=> res.json())
                .then(res=> {
                    console.log(res)
                })
                .catch(err=>console.log(err))
        }
        add(values)
    }

    return (
        <AdminContext.Provider value={{addSprawnosci}}>{children}</AdminContext.Provider>
    )
};