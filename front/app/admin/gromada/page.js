'use client'

import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {AdminContext} from "@/app/providers/AdminProvider";
import UserData from "@/app/admin/gromada/UserData";
import ActionModal from "@/app/admin/gromada/ActionModal";

export default function Gromada(){
    const {user}=useContext(GlobalContext)
    const {users,setUsers}=useContext(AdminContext)

    useEffect(() => {
        if(!user)return
        const getUsers=async ()=>{
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/uzytkownicy`,
                {
                    credentials: "include",
                })
                .then(res=>
                    res.json())
                .then(res=>{
                    console.log(res)
                        setUsers(res)
                    }
                )

                .catch()
        }
        getUsers()
    }, [user]);

    if(users)
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <ActionModal />
            <table className="table-fixed w-full border-collapse text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="w-[50px] px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                    <th className="w-[150px] px-4 py-3 text-left font-semibold text-gray-700 ">Login</th>
                    <th className="w-[150px] px-4 py-3 text-left font-semibold text-gray-700">Imię</th>
                    <th className="w-[150px] px-4 py-3 text-left font-semibold text-gray-700">Nazwisko</th>
                    <th className="w-[150px] px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                    <th className="w-[150px] px-4 py-3 text-left font-semibold text-gray-700">Nr telefonu</th>
                    <th className="w-[150px] px-4 py-3 text-left font-semibold text-gray-700">Typ</th>
                    <th className="w-[150px] px-4 py-3 text-left font-semibold text-gray-700">Rodzice</th>
                    <th className="w-[150px] px-4 py-3 text-left font-semibold text-gray-700">Akcje</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                {users &&users.map((user) => (
                    <UserData key={user.id} user={user}/>
                ))}
                </tbody>
            </table>
        </div>

    )
}