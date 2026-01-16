'use client'

import {useContext, useEffect, useRef, useState} from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import { SprawnoscContext } from "@/app/providers/AchievementProvider";

export default function Information() {
    const { user, pushClick,editUser } = useContext(GlobalContext);
    const { zdobyteSprawnosci, getZdobyteSprawnosci,sprawnosci,getSprawnosci } = useContext(SprawnoscContext);
    const zdobyteId=zdobyteSprawnosci.map(z=>z.sprawnoscId)
    const [isEdit,setEdit] = useState(false);

    const [form,setForm]=useState({
        nrTelefonu:user.nrTelefonu,
        dataUrodzenia:user.dataUrodzenia,
        email:user.email,
    })
    const send=()=>{
            editUser(user.id, {...user, ...form})
        setEdit(false)
    }

    useEffect(() => {
        if(!user)return
        getZdobyteSprawnosci(user.id);
        getSprawnosci()
    }, [user]);
    return (
        <div className="mt-5 flex flex-wrap bg-[#3A4F39] text-black">

            {/* LEWY */}
            <div className="flex-1 m-2.5 border-r border-black">

                <p className="font-semibold mb-2">Informacje</p>
                <div className="bg-[#D9D9D9] p-2 mr-2 relative">
                    <button
                        onClick={() => {
                            if (isEdit) {
                                setForm({ nrTelefonu:user.nrTelefonu,
                                    dataUrodzenia:user.dataUrodzenia,
                                    email:user.email,})
                            }
                            setEdit(!isEdit)
                        }
                        }
                        className="absolute right-2 top-2 text-lg text-blue-600 hover:underline"
                    >
                        {isEdit ? "Anuluj" : "Edytuj"}
                    </button>
                    <p><span>email: </span>
                        {!isEdit && <span>{user.email}</span>}
                        {isEdit && <input
                            className={"border-1 rounded-sm"}
                            value={form.email || ""}
                            onChange={(e) =>
                            {
                                setForm({...form, email: e.target.value})
                            }
                            }
                            type="text"
                        />}
                    </p>
                    <p className={"mt-0.5"}><span>numer telefonu: </span>
                        {!isEdit && <span>{user.nrTelefonu}</span>}
                        {isEdit && <input className={"border-1 rounded-sm"}
                            value={form.nrTelefonu || ""}  onChange={(e) =>
                        {
                            setForm({...form, nrTelefonu: e.target.value})
                        }
                        }
                            type="text"
                        />}
                    </p>
                    <p className={"m-0.5"}>
                       <span> data urodzenia: </span>
                        {!isEdit && <span>{user.dataUrodzenia}</span>}
                        {isEdit && <input
                            className={"border-1 rounded-sm"}
                            value={form.dataUrodzenia || ""}
                            onChange={(e) =>
                            {
                                setForm({...form, dataUrodzenia: e.target.value})
                            }
                            }
                            type="date"
                        />}
                    </p>
                    {isEdit&&<div>
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-200"
                            onClick={send}>Potwerdz
                        </button>

                        <button
                            className="px-4 mx-2 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={() => {
                                setEdit(false);
                                setForm({
                                    nrTelefonu: user.nrTelefonu,
                                    dataUrodzenia: user.dataUrodzenia,
                                    email: user.email,
                                })
                            }}
                        >
                            Anuluj
                        </button>
                    </div>}
                    <p className={"m-0.5"}>nazwa gromady: {user.gromada}</p>
                    <p>data dołączenia: {user.dataDolaczenia}</p>
                </div>
            </div>

            {/* CENTRALNY */}
            <div className="flex-1 m-2.5 border-r border-black pr-2">
                <div className="flex flex-wrap justify-between bg-[#D9D9D9] p-2">
                    <p className="font-semibold">Zdobyte sprawności</p>
                    <button
                        onClick={(e) => pushClick(e, `/achievements/gained/${user.id}`)}
                        className="bg-[#555353] text-white px-2 py-1 rounded"
                    >
                        Więcej
                    </button>
                </div>

                {zdobyteSprawnosci?.length > 0 && (
                    <div className="flex flex-wrap bg-[#D9D9D9] p-2 mt-2">
                        {sprawnosci.filter(s=>zdobyteId.includes(s.id)).map((s, i) => (
                            <div key={i} className="p-1 text-center">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}${s.ikonaUrl}`}
                                    alt={s.nazwa}
                                    className="w-[100px] h-[100px] object-cover"
                                />
                                <p>{s.nazwa}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
