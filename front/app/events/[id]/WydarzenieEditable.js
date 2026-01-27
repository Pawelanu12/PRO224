'use client'

import { useContext, useState } from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import { FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import {WydarzeniaContext} from "@/app/providers/EventProvider";
import DeleteDialog from "@/app/functions/DeleteDialog";

const showDate=(date)=>{
    return String(date.getDate()).padStart(2, '0')
        +"."
        +String(date.getMonth()+1).padStart(2, '0')
        +"."
        +date.getFullYear()
        +", "+String(date.getHours()).padStart(2, '0')
        +":"
        +String(date.getMinutes()).padStart(2, '0')

}

export default function WydarzenieEditable({ wydarzenie }) {
    const { editWydarzenie,deleteWydarzenie } = useContext(WydarzeniaContext);
    const { user } = useContext(GlobalContext);

    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({ ...wydarzenie });
    const [newFiles, setNewFiles] = useState([]);
    const [removePhotos, setRemovePhotos] = useState([]);
console.log(wydarzenie)
    const save = () => {
        const formData = new FormData();

        Object.entries(form).forEach(([k, v]) => {
            if (k !== "zdjecia") formData.append(k, v);
        });

        newFiles.forEach(f =>{ formData.append("noweZdjecia", f)});
        removePhotos.forEach(z => {formData.append("zdjeciaDoUsuniecia", z)});

        editWydarzenie(wydarzenie.id, formData);
        setIsEdit(false);
    };
    return (
        <div className="pt-2 px-4">

            {/* HEADER */}
            {(user?.typUzytkownika==="DRUZYNOWY"||user?.typUzytkownika==="PRZYBOCZNY")&&
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl">Wydarzenie</h1>
                    <div className={"flex flex-row"}>
                        <button
                            onClick={() => setIsEdit(prev => !prev)}
                            className="flex items-center gap-2 px-3 py-1 bg-[#3A4F39] rounded mr-2"
                        >
                            <FaPencilAlt/> {isEdit ? "Anuluj" : "Edytuj"}
                        </button>
                       <DeleteDialog id={wydarzenie.id} funkcjaDoUsunecia={deleteWydarzenie}/>
                    </div>

                </div>}

            <div className="flex flex-col md:flex-row gap-6">
                {/* LEWA KOLUMNA */}

                <div className="md:w-[30%] bg-[#222822] p-6 rounded-xl text-white">

                    <p className="text-sm text-gray-400 mb-1">Nazwa wydarzenia</p>

                    {!isEdit ? (
                        <div className="mb-4 px-3 py-2 bg-[#1A1919] rounded">
                            {form.nazwa}
                        </div>
                    ) : (
                        <input
                            className="w-full mb-4 px-3 py-2 bg-[white] text-[black] rounded"
                            value={form.nazwa}
                            onChange={e => setForm({...form, nazwa: e.target.value})}
                        />
                    )}


                    <p className="text-sm text-gray-400 mb-1">Opis</p>

                    {!isEdit ? (
                        <div className="mb-4 px-3 py-2 bg-[#1A1919] rounded whitespace-pre-wrap">
                            {form.opis}
                        </div>
                    ) : (
                        <textarea
                            className="w-full mb-4 px-3 py-2 bg-[white] text-[black] rounded resize-none"
                            value={form.opis}
                            onChange={e => setForm({...form, opis: e.target.value})}
                        />
                    )}
                    <p className="text-sm text-gray-400 mb-1">Typ</p>

                    {!isEdit ? (
                        <div className="mb-4 px-3 py-2 bg-[#1A1919] rounded whitespace-pre-wrap">
                            {form.typWydarzenia}
                        </div>
                    ) : (
                        <select
                            className="w-full mb-4 px-3 py-2 bg-[white] text-[black] rounded resize-none"
                            value={form.typWydarzenia}
                            onChange={e => setForm({...form, typWydarzenia: e.target.value})}
                        >
                            <option value={"BIWAK"}>BIWAK</option>
                            <option value={"ZIMOWISKO"}>ZIMOWISKO</option>
                            <option value={"OBOZ"}>OBOZ</option>
                            <option value={"KOLONIA"}>KOLONIA</option>
                        </select>
                    )}


                    <p className="text-sm text-gray-400 mb-1">Data wyjazdu</p>

                    {!isEdit ? (
                        <div className="mb-3 px-3 py-2 bg-[#1A1919] rounded">
                            {showDate(new Date(form.dataWyjazdu))}
                        </div>
                    ) : (
                        <input
                            type="datetime-local"
                            className="w-full mb-3 px-3 py-2 bg-[white] text-[black] rounded"
                            value={form.dataWyjazdu}
                            onChange={e => setForm({...form, dataWyjazdu: e.target.value})}
                        />
                    )}

                    <p className="text-sm text-gray-400 mb-1">Data zakończenia</p>

                    {!isEdit ? (
                        <div className="mb-3 px-3 py-2 bg-[#1A1919]  rounded">
                            {showDate(new Date(form.dataZakonczenia))}

                        </div>
                    ) : (
                        <input
                            type="datetime-local"
                            className="w-full mb-3 px-3 py-2 bg-[white] text-[black] rounded"
                            value={form.dataZakonczenia}
                            onChange={e => setForm({...form, dataZakonczenia: e.target.value})}
                        />
                    )}
                    {isEdit &&

                        <button
                            className="w-full bg-green-600 py-2 rounded disabled:opacity-50"
                            onClick={save}
                        >
                            Potwerdż zmiany
                        </button>

                    }
                </div>

                {/* PRAWA KOLUMNA */}
                <div className="md:w-[70%] bg-[#1A1919] p-6 rounded-xl text-white">

                    <h2 className="mb-4">Galeria</h2>

                    <div className="flex flex-wrap gap-4">

                        {/* ISTNIEJĄCE */}
                        {wydarzenie.zdjecia
                            .filter(z => !removePhotos.includes(z))
                            .map((z, i) => (
                                <div key={i} className="relative">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/uploads/wydarzenia/${z}`}
                                        className="max-w-[180px] rounded"
                                    />

                                    {isEdit && (
                                        <button
                                            onClick={() => setRemovePhotos(p => [...p, z])}
                                            className="absolute top-1 right-1 bg-black/70 p-1 rounded"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            ))
                        }

                        {/* NOWE */}
                        {newFiles.map((f, i) => (
                            <div key={i} className="relative">
                                <img
                                    src={URL.createObjectURL(f)}
                                    className="max-w-[180px] rounded"
                                />
                                {isEdit&&<button
                                    onClick={() =>
                                        setNewFiles(prev => prev.filter((_, idx) => idx !== i))
                                    }
                                    className="absolute top-1 right-1 bg-black/70 p-1 rounded"
                                >
                                    <FaTrash/>
                                </button>}
                            </div>
                        ))}

                        {/* DODAJ */}
                        {isEdit && (
                            <label className="w-[180px] h-[120px] border border-dashed flex items-center justify-center cursor-pointer">
                                <FaPlus />
                                <input
                                    type="file"
                                    multiple
                                    hidden
                                    accept="image/*"
                                    onChange={e =>
                                        setNewFiles(prev => [...prev, ...Array.from(e.target.files)])
                                    }
                                />
                            </label>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
