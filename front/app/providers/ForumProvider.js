'use client'


import {createContext, useState} from "react";

import pos from "/app/data/posty.json"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export const ForumContext = createContext();

export default function ForumProvider({ children }) {
    const [posty, setPosty] = useState([]);
    const [loading, setLoading] = useState(false);

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
                    "Content-Type": "application/json"},
                body:JSON.stringify({...body})
            })
                .then(res=>res.json())
                .then(res=> {
                    console.log(res)
                })
                .catch(err=>console.log(err))
        }
        add(body)
    }
    return (
        <ForumContext.Provider value={{
            posty,loading,getPosty,addPosty
        }}>{children}</ForumContext.Provider>
    )
};