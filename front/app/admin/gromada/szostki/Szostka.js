'use client'

import {useContext, useState} from "react";
import AddModal from "@/app/admin/gromada/szostki/AddModal";
import { AdminContext } from "@/app/providers/AdminProvider";
import {FaCheck, FaPencilAlt, FaTimes} from "react-icons/fa";
import DeleteDialog from "@/app/functions/DeleteDialog";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Szostka({ szostka }) {
    const { addSzostkaUser,deleteSzostka,
        editSzostkaName,deleteSzostkaUser } = useContext(AdminContext);
    const {pushClick}=useContext(GlobalContext)
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(szostka?.nazwa || "");

    const cancelEdit = () => {
        setName(szostka.nazwa);
        setIsEdit(false);
    };

    const saveEdit = () => {
        if (!name.trim()) return;
        editSzostkaName(szostka.id, {nazwa:name});
        setIsEdit(false);
    };
    return (
        <div
            className="
                w-full
                sm:w-1/2
                lg:w-1/3
                p-3
            "
        >
            {/* KARTA */}
            <div
                className="
                    h-full
                    bg-[#222822]
                    rounded-xl
                    shadow-md
                    border border-black/20
                    p-4
                    flex flex-col
                    gap-3
                "
            >
                <div className="flex items-center justify-between gap-2 border-b border-black/30 pb-2">

                    {/* NAZWA / INPUT */}
                    {!isEdit ? (
                        <h2 className="text-lg font-bold text-white break-words">
                            {szostka.nazwa}
                        </h2>
                    ) : (
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="
                                bg-[#1A1919]
                                text-white
                                border-b
                                border-gray-500
                                outline-none
                                w-full
                            "
                        />
                    )}
                    <div className="flex gap-2 text-white">
                        {!isEdit ? (
                            <div>
                            <button
                                onClick={() => setIsEdit(true)}
                                className="hover:text-blue-400"
                                title="Edytuj"
                            >
                                <FaPencilAlt/>
                            </button>

                                <DeleteDialog id={szostka.id} funkcjaDoUsunecia={deleteSzostka} isTrash={true} />
                            </div>
                        ) : (
                            <div>
                            <button
                                onClick={saveEdit}
                                className="hover:text-green-400"
                                title="Zapisz"
                            >
                                <FaCheck />
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="hover:text-yellow-400"
                                title="Anuluj"
                            >
                                <FaTimes />
                            </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* LISTA UŻYTKOWNIKÓW */}
                <div className="flex flex-col gap-1">
                    {szostka?.uzytkownicy?.length > 0 ? (
                        szostka.uzytkownicy.map((u, i) => (

                            <div key={i} className={"flex flex-row flex-wrap"}>
                                <div

                                className="
                                    bg-[#D9D9D9]
                                    text-black
                                    rounded
                                    px-2
                                    py-1
                                    text-sm
                                    flex-100
                                "
                            >
                                    <span
                                        onClick={()=>pushClick("",`/profile/user/${u.id}`)}
                                        className={" hover:underline cursor-pointer hover:text-blue-600"}>{u.login}</span>
                                </div>
                                <DeleteDialog id={u.id} funkcjaDoUsunecia={deleteSzostkaUser} isTrash={true} />

                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm italic text-center">
                            Brak użytkowników
                        </p>
                    )}
                </div>

                {/* PRZYCISK / MODAL */}
                <div className="mt-auto pt-3 border-t border-black/20">
                    <AddModal
                        funkcjaDoDodania={addSzostkaUser}
                        id={szostka?.id}
                        typ="user"
                    />
                </div>
            </div>
        </div>
    );
}
