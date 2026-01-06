'use client'


import {createContext, useContext, useEffect, useRef, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const AdminContext = createContext();

export default function AdminProvider({ children }) {
    const {pushClick}= useContext(GlobalContext);
    const {user}=useContext(GlobalContext);
    const addSprawnosci = (values) => {
        const add=async (values)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc`,{
                method:"POST",
                credentials: "include",
                body:values
            })
                .then(res=> res.json())
                .then(res=> {
                    console.log(res)
                    pushClick("","/sprawnosci")
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
                credentials: "include",
                body:values
            })
                .then(res=> res.json())
                .then(res=> {
                    console.log(res)
                    pushClick("","/sprawnosci")
                })
                .catch(err=>console.log(err))
        }
        edit(values)
    }
    const deleteSprawnosci = (id)=>{
        const usun=async (id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/sprawnosc/${id}`, {
                method: "Delete",
                credentials: "include"
            })
                .then(res=>{
                    console.log(res)
                    if(res.ok)
                        pushClick("","/sprawnosci")
                })

        }
        usun(id)
    }
    const addWydarzenie = (values) => {
        console.log(values)
       const add=async (values)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie`,{
                method:"POST",
                credentials: "include",

                body:values
            })
                .then(res=> res.json())
                .then(res=> {
                    console.log(res)
                    pushClick("","/wydarzenia")
                })
                .catch(err=>console.log(err))
        }
        add(values)
    }

    const editWydarzenie = (id,values) => {
        console.log(id)
        console.log(values)
        const edit=async (values)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie/${id}`,{
                method:"PUT",
                credentials: "include",
                body:values
            })
                .then(res=> res.json())
                .then(res=> {
                    console.log(res)
                    pushClick("","/wydarzenia")
                })
                .catch(err=>console.log(err))
        }
        edit(values)
    }

    const deleteWydarzenie = (id)=>{
        // if(!user.typUzytkownika==="DRUZYNOWY")
        //     return
        const usun=async (id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie/${id}`, {
                method: "Delete",
                credentials: "include"
            })
                .then(res=>{
                    console.log(res)
                    if(res.ok)
                        pushClick("","/wydarzenia")
                })

        }
        usun(id)
    }

    // useEffect(() => {
    //     if(!user)return
    //
    //     if(user.typUzytkownika!=="DRUZYNOWY")
    //         pushClick(null,"/gromada")
    // }, [user]);

    return (
        <AdminContext.Provider value={{deleteWydarzenie,editWydarzenie,editSprawnosci,addSprawnosci,addWydarzenie,deleteSprawnosci}}>{children}</AdminContext.Provider>
    )
};