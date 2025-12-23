'use client'


import {createContext, useContext, useState} from "react";

import pos from "/app/data/posty.json"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const ForumContext = createContext();

export default function ForumProvider({ children }) {
    const [posty, setPosty] = useState([]);
    const [loading, setLoading] = useState(false);
    const {replaceClick}=useContext(GlobalContext);
    const getPosty = () => {
        const get=async ()=>{
            setLoading(true)
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/posty`,{
                method:"GET",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"}
            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                    if(Array.isArray(res))
                        setPosty(res)
                })
                .catch(err=>console.log(err))
                .finally(()=>setLoading(false))
        }
        get()
    }

    const addPosty = (body) => {
        const add=async (body)=>{
            console.log(body)
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/posty`,{
                method:"POST",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                body:body
            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                    getPosty()
                })
                .catch(err=>console.log(err))
        }
        add(body)
    }
    const editPost = (id,body) => {
        const edit=async (id,body)=>{
            console.log(body)
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/posty/${id}`,{
                method:"PUT",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"},
                body:JSON.stringify({...body})
            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                    if(!res.error)
                        replaceClick("","/forum")
                    else
                        alert(res.error)
                })
                .catch(err=>console.log(err))
        }
        edit(id,body)
    }

    const deletePost = (id)=>{
        const usun=async (id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/posty/${id}`, {
                method: "Delete",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
                .then(res=>{
                    console.log(res)
                    if(res.ok)
                        replaceClick("","/forum")
                })

        }
        usun(id)
        }
    const changeLike=(id,uzytkownikId)=>{
        const change=async (id,uzytkownikId)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/posty/${id}/like?uzytkownikId=${uzytkownikId}`,{
                method:"PUT",
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,}
            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                    setPosty(prev=>prev.map(p=>p.id===id?res:p))
                })
                .catch(err=>console.log(err))

        }
        change(id,uzytkownikId)
    }
    return (
        <ForumContext.Provider value={{
            posty,loading,getPosty,addPosty,editPost,deletePost,changeLike
        }}>{children}</ForumContext.Provider>
    )
};