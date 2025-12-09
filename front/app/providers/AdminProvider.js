'use client'


import {createContext, useContext, useRef, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {NextResponse as res} from "next/server";
export const AdminContext = createContext();

export default function AdminProvider({ children }) {
    const {replaceClick}= useContext(GlobalContext);
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
                    replaceClick("","/sprawnosci")
                })
                .catch(err=>console.log(err))
        }
        add(values)
    }
    const editSprawnosci = (id,values) => {
        console.log(id)
        const edit=async (values)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc/${id}`,{
                method:"PUT",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body:values
            })
                .then(res=> res.json())
                .then(res=> {
                    console.log(res)
                    replaceClick("","/sprawnosci")
                })
                .catch(err=>console.log(err))
        }
        edit(values)
    }
    const deleteSprawnosci = (id)=>{
        const usun=async (id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc/${id}`, {
                method: "Delete",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
                .then(res=>{
                    console.log(res)
                    if(res.ok)
                        replaceClick("","/sprawnosci")
                })

        }
        usun(id)
    }
    const addWydarzenie = (values) => {
        console.log(values)
       const add=async (values)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie`,{
                method:"POST",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    // "Content-Type": "application/json"
                },

                body:values
            })
                .then(res=> res.json())
                .then(res=> {
                    console.log(res)
                    replaceClick("","/wydarzenia")
                })
                .catch(err=>console.log(err))
        }
        add(values)
    }

    const editWydarzenie = (id,values) => {
        console.log(id)
        const edit=async (values)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie/${id}`,{
                method:"PUT",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    // "Content-Type": "application/json"

                },
                body:values
            })
                .then(res=> res.json())
                .then(res=> {
                    console.log(res)
                    replaceClick("","/wydarzenia")
                })
                .catch(err=>console.log(err))
        }
        edit(values)
    }

    const deleteWydarzenie = (id)=>{
        const usun=async (id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie/${id}`, {
                method: "Delete",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
                .then(res=>{
                    console.log(res)
                    if(res.ok)
                        replaceClick("","/wydarzenia")
                })

        }
        usun(id)
    }

    return (
        <AdminContext.Provider value={{deleteWydarzenie,editWydarzenie,editSprawnosci,addSprawnosci,addWydarzenie,deleteSprawnosci}}>{children}</AdminContext.Provider>
    )
};