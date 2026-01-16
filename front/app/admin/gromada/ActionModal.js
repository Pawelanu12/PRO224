'use client'

import {useContext, useEffect, useState} from "react";
import {AdminContext} from "@/app/providers/AdminProvider";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {SprawnoscContext} from "@/app/providers/AchievementProvider";

export default function ActionModal() {
    const {deleteUser,id,setUsers,open,setOpen,action}=useContext(AdminContext)
    const {sprawnosci,getSprawnosci,getZdobyteSprawnosci,
            zdobyteSprawnosci,gainAchievement,deleteAchievement}=useContext(SprawnoscContext)
    const [loading,setLoading]=useState(false)
    const [gainedIds,setGainedIds]=useState([])
    const onConfirmDelete=()=>{
        setOpen(false)
        deleteUser(id)
        setUsers(prev=>prev.filter(user=>user.id!==id))

    }
    useEffect(() => {
      setGainedIds(zdobyteSprawnosci.length>0?zdobyteSprawnosci.map(z=>z.sprawnoscId):[]);
    }, [zdobyteSprawnosci]);
    useEffect(() => {
        if(!id)return;
        getZdobyteSprawnosci(id)
    }, [id]);

    useEffect(()=>{

        if(sprawnosci&&sprawnosci.length>0)return
        setLoading(true)
        getSprawnosci()
        setLoading(false)
    },[])
    if (!open) return null;
    if(!action) return null;
    if(loading) return <div className="fixed inset-0 z-50 flex items-center justify-center">loading</div>;
    if(action==='delete')
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Tło */}
                <div
                    className="absolute inset-0 bg-black/40"
                    onClick={()=>setOpen(false)}

                />

                {/* Dialog */}
                <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                        Potwierdzenie
                    </h2>

                    <p className="mb-6 text-gray-600">
                        Czy potwierdzasz usunięcie?
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={()=>setOpen(false)}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm
                       text-gray-700 hover:bg-gray-100 transition"
                        >
                            Anuluj
                        </button>

                        <button
                            onClick={onConfirmDelete}
                            className="rounded-md bg-red-500 px-4 py-2 text-sm
                       text-white hover:bg-red-600 transition"
                        >
                            Usuń
                        </button>
                    </div>
                </div>
            </div>
        );
    if(action==="achievements")
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />

                {/* Modal */}
                <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-xl">
                    {/* Header */}
                    <div className="border-b px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Zarządzanie sprawnościami
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {sprawnosci?.map((s, i) => (
                                <div  key={i}>
                                    {!gainedIds.includes(s.id)&&<div
                                        onClick={()=>
                                        {
                                            gainAchievement({uzytkownikId:id,sprawnoscId:s.id,dataZdobyciaSprawnosci:new Date()})

                                        }}
                                        className="group flex flex-col items-center rounded-lg border
                                             border-gray-200 bg-gray-50 p-3 text-center
                                             hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer"
                                        >
                                        <img
                                            className="h-12 w-12 object-contain mb-2"
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}${s.ikonaUrl}`}
                                            alt={""}
                                        />

                                        <span className="text-sm font-medium text-gray-700
                                            group-hover:text-blue-600">
                                            {s.nazwa}
                                        </span>
                                    </div>}

                                    {gainedIds.includes(s.id)&&<div
                                        onClick={()=>
                                        {

                                            deleteAchievement(zdobyteSprawnosci.filter(z => z.sprawnoscId===s.id&&z.uzytkownikId===id)[0].id)
                                        }}
                                        className="group flex flex-col items-center rounded-lg border
                                             border-gray-200  p-3 text-center bg-[blue]
                                             hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer"
                                    >
                                        <img
                                            className="h-12 w-12 object-contain mb-2"
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}${s.ikonaUrl}`}
                                            alt={""}
                                        />

                                        <span className="text-sm font-medium text-gray-700
                                            group-hover:text-blue-600">
                                            {s.nazwa}
                                        </span>
                                    </div>}
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end border-t px-6 py-4">
                        <button
                            onClick={() => setOpen(false)}
                            className="rounded-md bg-blue-500 px-5 py-2 text-sm font-medium
                            text-white hover:bg-blue-600 transition"
                        >
                            Zakończ
                        </button>
                    </div>
                </div>
            </div>

        );
}
