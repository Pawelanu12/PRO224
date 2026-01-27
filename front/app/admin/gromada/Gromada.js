'use client'

import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {AdminContext} from "@/app/providers/AdminProvider";
import UserData from "@/app/admin/gromada/UserData";
import ActionModal from "@/app/admin/gromada/ActionModal";
import TableHeader from "@/app/admin/gromada/TableHeader";

export default function Gromada(){
    const {user}=useContext(GlobalContext)
    const {users,getUsers}=useContext(AdminContext)
    const [sortBy, setSortBy]=useState("id");
    const [malejace,setMalejace]=useState(false);

    const handleSort = (e) => {
        if(sortBy!==e.currentTarget.id){
            setSortBy(e.currentTarget.id);
            setMalejace(false)
        }
        else
            setMalejace(!malejace)

    }
    useEffect(() => {
        if(!user)return
        getUsers()
    }, [user]);

    if(users)
        return (
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <ActionModal />
                <table className="table-fixed w-full border-collapse text-sm">
                    <thead className="bg-gray-100">
                    <tr>
                        <TableHeader id={"id"} nazwa={"ID"} handleSort={handleSort} malejace={malejace} sortBy={sortBy} setSortBy={setSortBy} size={100}/>
                        <TableHeader id={"login"} nazwa={"Login"} handleSort={handleSort} malejace={malejace} sortBy={sortBy} setSortBy={setSortBy} />
                        <TableHeader id={"imie"} nazwa={"Imię"} handleSort={handleSort} malejace={malejace} sortBy={sortBy} setSortBy={setSortBy} />
                        <TableHeader id={"nazwisko"} nazwa={"Nazwisko"} handleSort={handleSort} malejace={malejace} sortBy={sortBy} setSortBy={setSortBy} />
                        <TableHeader id={"email"} nazwa={"Email"} handleSort={handleSort} malejace={malejace} sortBy={sortBy} setSortBy={setSortBy} />
                        <TableHeader id={"nrTelefonu"} nazwa={"Numer telefonu"} handleSort={handleSort} malejace={malejace} sortBy={sortBy} setSortBy={setSortBy} size={100}/>
                        <TableHeader id={"typUzytkownika"} nazwa={"Typ"} handleSort={handleSort} malejace={malejace} sortBy={sortBy} setSortBy={setSortBy} />
                        <TableHeader id={"rodzice"} nazwa={"Rodzice"} handleSort={handleSort} malejace={malejace} sortBy={sortBy} setSortBy={setSortBy}/>
                        {/*<TableHeader id={"nazwaSzostki"} nazwa={"Szóstka"} handleSort={handleSort} malejace={malejace} sortBy={sortBy} setSortBy={setSortBy}/>*/}
                        <th className="w-[150px] px-4 py-3 text-left font-semibold text-gray-700">Akcje</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {users &&[...users]
                        .sort((u1,u2)=> {
                            if(sortBy==="id")
                                return malejace?u2.id-u1.id:u1.id-u2.id
                            if(sortBy==="rodzice")
                                return malejace? u1.typUzytkownika.localeCompare(u2.typUzytkownika,"pl")
                                    :u2.typUzytkownika.localeCompare( u1.typUzytkownika,"pl")
                            const value1=String(u1[sortBy]||"")
                            const value2=String(u2[sortBy]||"")
                            return malejace? value2.localeCompare(value1,"pl")
                                :value1.localeCompare(value2,"pl")
                        })
                        .map((user1) => (
                            <UserData key={user1.id} user={user1} id={user.id}/>
                        ))}
                    </tbody>
                </table>
            </div>

        )
}