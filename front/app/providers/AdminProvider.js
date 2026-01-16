'use client'


import {createContext, useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const AdminContext = createContext();

export default function AdminProvider({ children }) {
    const {pushClick}= useContext(GlobalContext);
    const {user,fetchWithAuth}=useContext(GlobalContext);
    const [users,setUsers] = useState([]);
    const [action,setAction] = useState(null);
    const [open,setOpen]=useState(false)

    const [id,setId]=useState()
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
                    pushClick("","/achievements")
                })
                .catch(err=>console.log(err))
        }
        add(values)
    }
    const addWydarzenie = (values) => {
        console.log(values)
       const add=async (values)=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie`,{
                method:"POST",
                credentials: "include",

                body:values
            })
                .then(res=> res.json())
                .then(res=> {
                    console.log(res)
                    // pushClick("","/events")
                })
                .catch(err=>console.log(err))
        }
        add(values)
    }


    const deleteWydarzenie = (id)=>{
        // if(!user.typUzytkownika==="DRUZYNOWY")
        //     return
        const usun=async (id)=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie/${id}`, {
                method: "Delete",
                credentials: "include"
            })
                .then(res=>{
                    console.log(res)
                    if(res.ok)
                        pushClick("","/events")
                })

        }
        usun(id)
    }

    useEffect(() => {
        if(!user)return
        if(user.typUzytkownika!=="DRUZYNOWY"&& user.typUzytkownika!=="PRZYBOCZNY")
            pushClick(null,"/")
    }, [user]);

    const updateUser=(id,values)=>{
        const f=async (id,values)=>{
            await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/${id}/changeTyp`,
                {
                    method:"PUT",
                    credentials: "include",
                    headers:{'Content-type':"application/json"},
                    body:JSON.stringify(values)
                })
                .then(res=>res.status)
                .then(res=>{if(res===400)alert("wystapil blad")})
                .catch(err=>console.log(err))
        }
        f(id,values)
    }

    const deleteUser=(id)=>{
        const f=async (id)=>{
            await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/${id}`,
                {
                    method:"DELETE",
                    credentials: "include",
                    headers:{'Content-type':"application/json"},
                })
                .then(res=>res.status)
                .then(res=>{if(res===400)alert("wystapil blad")})
                .catch(err=>console.log(err))
        }
        f(id)
    }



    return (
        <AdminContext.Provider value={{
            deleteWydarzenie,
            addSprawnosci,
            addWydarzenie,
            users,
            updateUser,
            deleteUser,
            setUsers,
        open,
        setOpen,
        id,
        setId,
        setAction,action}}>{children}</AdminContext.Provider>
    )
};