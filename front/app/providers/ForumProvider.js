'use client'


import {createContext, useContext, useState} from "react";

import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const ForumContext = createContext();

export default function ForumProvider({ children }) {
    const [posty, setPosty] = useState([]);
    const [loading, setLoading] = useState(false);
    const {pushClick}=useContext(GlobalContext);

    const [postForDialog,setPostForDialog] = useState(null);
    const getPosty = () => {
        const get=async ()=>{
            setLoading(true)
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/posty`,{
                method:"GET",
                credentials:"include"
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
                credentials: "include",
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
            console.log(id)
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/posty/${id}`,{
                method:"PUT",
                credentials: "include",
                body:body
            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                    if(!res.error)
                        pushClick("","/forum")
                    else
                        alert(res.error)
                })
                .catch(err=>console.log(err))
                .finally(()=>getPosty())
        }
        edit(id,body)
    }

    const deletePost = (id)=>{
        const usun=async (id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/posty/${id}`, {
                method: "Delete",
                credentials: "include",

            })
                .catch((err)=>console.log(err))
                .finally(()=>getPosty())

        }
        usun(id)
        }
    const changeLike=(id,uzytkownikId)=>{
        const change=async (id,uzytkownikId)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/posty/${id}/like?uzytkownikId=${uzytkownikId}`,{
                method:"PUT",
                credentials: "include",
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

    const writeComment=(body)=>{
        const send=async (body)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/komentarz`,{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",

                body:JSON.stringify(body)
            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                })
                .catch(err=>console.log(err))
                // .finally(()=>getPosty())
        }
        send(body)
    }
    return (
        <ForumContext.Provider value={{setPosty,postForDialog,setPostForDialog,
            writeComment,posty,loading,getPosty,addPosty,editPost,deletePost,changeLike
        }}>{children}</ForumContext.Provider>
    )
};