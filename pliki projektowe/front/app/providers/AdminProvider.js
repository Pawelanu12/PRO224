'use client'


import {createContext, useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
export const AdminContext = createContext();

export default function AdminProvider({ children }) {
    const {pushClick}= useContext(GlobalContext);
    const {user,fetchWithAuth}=useContext(GlobalContext);
    const [users,setUsers] = useState([]);
    const [action,setAction] = useState(null);
    const [open,setOpen]=useState(false)
    const [szostki,setSzostki] = useState([]);

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
                    pushClick("","/achievements")
                })
                .catch(err=>console.log(err))
        }
        add(values)
    }
    const addWydarzenie = (values) => {
       const add=async (values)=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie`,{
                method:"POST",
                credentials: "include",

                body:values
            })
                .then(res=> res.json())
                .then(res=> {
                    pushClick("","/events")
                })
                .catch(err=>console.log(err))
        }
        add(values)
    }


    const deleteWydarzenie = (id)=>{
        const usun=async (id)=>{
            await fetchWithAuth( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/wydarzenie/${id}`, {
                method: "Delete",
                credentials: "include"
            })
                .then(res=>{
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

    const updateTyp=(id,values)=>{
        const f=async (id,values)=>{
            await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/${id}/type?newType=${values}`,
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
                })
                .then(res=>res.status)
                .then(res=>{if(res===400)alert("wystapil blad")})
                .catch(err=>console.log(err))
        }
        f(id)
    }

    const changeParrents=(id,values)=>{
        const f=async (id,values)=>{
            await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/${id}/parents`,
                {
                    method:"PUT",
                    credentials: "include",
                    headers:{'Content-type':"application/json"},
                    body:JSON.stringify(values)
                })
                .then(res=>res.json)
                .then(res=>{
                    if(res.login)
                        setUsers(prev=>prev.map(u=>u.id!==id?u:{...u,...res}))
                })
                .catch(err=>alert("wystapil blad"))
        }
        f(id,values)
    }

    const getUsers=()=>{
        const f=async ()=> {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy`,
                {
                    credentials: "include",
                })
                .then(res =>
                    res.json())
                .then(res => {
                    if(Array.isArray(res))
                        setUsers(res)
                    }
                )
                .catch()
        }
        f()
    }
    const getSzostki=()=>{
        const f=async ()=> {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/szostka`,
                {
                    credentials: "include",
                })
                .then(res =>
                    res.json())
                .then(res => {
                        if(Array.isArray(res))
                            setSzostki(res)
                    }
                )
                .catch(err=>console.log(err))

        }
        f()
    }

    const addSzostka = (nazwa,id=null) => {
        const add=async (values)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/szostka`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials: "include",
                body:JSON.stringify({nazwa:values,dataStworzenia:new Date()}),
            })
                .then(res=> res.json())
                .then(res=> {
                    if(res.id)
                        setSzostki([...szostki,res])
                })
                .catch(err=>console.log(err))
        }
        add(nazwa)
    }

    const addSzostkaUser = (login,id) => {
        const add=async (login,id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/szostka/${id}/user?login=${login}`,{
                method:"POST",
                credentials: "include",
            })
                .then(res=> res.json())
                .then(res=> {
                    if(res.id)
                        setSzostki(prev=>prev.map(s=>s.id!==id?
                            s.uzytkownicy.map(u=>u.login).includes(login)?{...s,uzytkownicy:s.uzytkownicy.filter(u=>u.login!==login)}:s:res))
                })
                .catch(err=>console.log(err))
        }
        add(login,id)
    }
    const deleteSzostkaUser = (id) => {
        const delet=async (id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/szostka/${id}/user`,{
                method:"Delete",
                credentials: "include",
            })
                .then(res=> {
                        setSzostki(prev=>prev.map(s=>!s.uzytkownicy.map(u=>u.id).includes(id)?s:
                            {...s,uzytkownicy:s.uzytkownicy.filter(u=>u.id!==id)}))
                })
                .catch(err=>console.log(err))
        }
        delet(id)
    }

    const editSzostkaName = (id,values) => {
        const edit=async (values,id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/szostka/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values),
                credentials: "include",
            })
                .then(res=> res.json())
                .then(res=> {
                    if(res.nazwa)
                    setSzostki(prev=>prev.map(s=>s.id!==id?s:
                        res))
                })
                .catch(err=>console.log(err))
        }
        edit(values,id)
    }
    const deleteSzostka = (id) => {
        const delet=async (id)=>{
            await fetch( `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/szostka/${id}`,{
                method:"Delete",
                credentials: "include",
            })
                .then(res=> {
                    setSzostki(prev=>prev.filter(s=>s.id!==id))
                })
                .catch(err=>console.log(err))
        }
        delet(id)
    }



    // const editUserByAdmin=(id,values)=>{
    //     const f=async (id,values)=>{
    //         await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy/${id}`,
    //             {
    //                 method:"PUT",
    //                 headers:{'Content-type':"application/json"},
    //                 credentials: "include",
    //                 body:JSON.stringify(
    //                     values)
    //             })
    //             .then(res=>res.json())
    //             .then(res=>console.log(res))
    //     }
    //     f(id,values)
    // }
    return (
        <AdminContext.Provider value={{
            deleteWydarzenie,
            addSprawnosci,
            addWydarzenie,
            users,
            getUsers,
            updateTyp,
            deleteUser,
            setUsers,
            open,
            setOpen,
            id,
            setId,
            setAction,
            action,
            changeParrents,
            getSzostki,
            szostki,
            addSzostka,
            addSzostkaUser,
            deleteSzostkaUser,
            editSzostkaName,
            deleteSzostka
            }}>{children}</AdminContext.Provider>
    )
};