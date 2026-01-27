'use client'

import {use, useContext, useEffect, useRef, useState} from "react";
import { SprawnoscContext } from "@/app/providers/AchievementProvider";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import DeleteDialog from "@/app/functions/DeleteDialog";

export default function AchievementPage({ params }) {
    const { sprawnosci, getSprawnosci,editSprawnosci,sprawnosc,setSprawnosc,deleteSprawnosci } = useContext(SprawnoscContext);

    const { user } = useContext(GlobalContext);

    const [loading, setLoading] = useState(true);
    const [isEdit, setEdit] = useState(false);

    const [form, setForm] = useState({
        nazwa: "",
        opis: "",
        opisWymagan: ""
    });

    const TYPY_SPRAWNOSCI = [
        { value: "RED", label: "CZERWONY" },
        { value: "YELLOW", label: "ŻÓŁTY" },
        { value: "GREEN", label: "ZIELONY" },
        { value: "BLUE", label: "NIEBIESKI" },
        { value: "PURPLE", label: "FIOLETOWY" },
    ];

    const [newImage, setNewImage] = useState(null);
    const fileInputRef = useRef(null);

    const { id } = use(params);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setNewImage(file);
    };


    /* ===================== LOAD ===================== */
    useEffect(() => {
        if (!user) return;
        if (!sprawnosci.length) getSprawnosci();
        setLoading(false);
    }, [user]);

    useEffect(() => {
        if (!id || !sprawnosci.length) return;
        const s = sprawnosci.find(s => s.id == id);
        if (s) setSprawnosc(s);
    }, [id, sprawnosci]);

    const setFormBase=()=>{
        setForm({
            nazwa: sprawnosc.nazwa || "",
            opis: sprawnosc.opis || "",
            opisWymagan: sprawnosc.opisWymagan || "",
            typSprawnosci:sprawnosc.typ||""
        });
    }
    useEffect(() => {
        if (!sprawnosc?.id) return;
        setFormBase()
    }, [sprawnosc]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const sendForm=()=>{
        const formData = new FormData();

        Object.entries(form).forEach(([k, v]) => {
        formData.append(k, v);
        });
    if(newImage) {
        formData.append("ikona", newImage);
    }

        editSprawnosci(sprawnosc.id,formData)
    }

    if (loading)
        return <div className="text-center mt-10 text-gray-500">Ładowanie...</div>;

    if (!sprawnosc.id)
        return <div className="text-center mt-10 text-red-500">Sprawność nie znaleziona</div>;

    return (
        <div className="min-h-[calc(100vh-50px)] flex justify-center p-4 bg-[#1A1919]">

            {/* GŁÓWNY KONTENER */}
            <div
                className="relative max-w-4xl w-full bg-[#222822] rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-6">

                {/* PRZEŁĄCZNIK EDYCJI */}
                {user?.typUzytkownika==="DRUZYNOWY"&&<button
                    onClick={() => {
                        if (isEdit) {
                            setFormBase()
                            setNewImage(null);
                        }
                        setEdit(!isEdit)
                    }
                    }
                    className="absolute right-4 top-4 text-sm text-blue-400 hover:underline"
                >
                    {isEdit ? "Anuluj" : "Edytuj"}
                </button>}

                {/* LEWA STRONA */}
                <div className="flex-1 flex flex-col gap-4 sm:max-w-[50%]">

                    {/* NAZWA */}
                    {!isEdit ? (
                        <h1 className="text-2xl font-bold text-white break-words">
                            {sprawnosc.nazwa}
                        </h1>
                    ) : (
                        <input
                            name="nazwa"
                            value={form.nazwa}
                            onChange={handleChange}
                            className="
                                w-full
                                bg-[#1A1919]
                                text-white
                                text-2xl
                                font-bold
                                border-b border-gray-500
                                outline-none
                            "
                        />
                    )}

                    {/* OPIS */}
                    <div className="bg-gray-100 p-3 rounded border border-gray-300">
                        <h2 className="font-semibold text-gray-700 mb-1">
                            Opis:
                        </h2>

                        {!isEdit ? (
                            <p className="text-gray-600 break-words whitespace-pre-wrap">
                                {sprawnosc.opis}
                            </p>
                        ) : (
                            <textarea
                                name="opis"
                                value={form.opis}
                                onChange={handleChange}
                                rows={4}
                                className="
                                    w-full
                                    bg-white
                                    text-gray-700
                                    border border-gray-400
                                    rounded
                                    p-2
                                    resize-none
                                    outline-none
                                "
                            />
                        )}
                    </div>

                    {/* WYMAGANIA */}
                    {(user.typUzytkownika === "DRUZYNOWY" ||
                        user.typUzytkownika === "PRZYBOCZNY") && (
                        <div className="bg-gray-100 p-3 rounded border border-gray-300">
                            <h2 className="font-semibold text-gray-700 mb-1">
                                Wymagania:
                            </h2>

                            {!isEdit ? (
                                <p className="text-gray-600 break-words whitespace-pre-wrap">
                                    {sprawnosc.opisWymagan}
                                </p>
                            ) : (
                                <textarea
                                    name="opisWymagan"
                                    value={form.opisWymagan}
                                    onChange={handleChange}
                                    rows={4}
                                    className="
                                        w-full
                                        bg-white
                                        text-gray-700
                                        border border-gray-400
                                        rounded
                                        p-2
                                        resize-none
                                        outline-none
                                    "
                                />
                            )}
                        </div>
                    )}

                    {/* TYP */}
                    <div className="bg-gray-100 p-3 rounded border border-gray-300">
                        <h2 className="font-semibold text-gray-700 mb-1">
                            TYP:
                        </h2>

                        {!isEdit ? (
                            <p className="text-gray-600 break-words whitespace-pre-wrap">
                                {(TYPY_SPRAWNOSCI.find(q=>q.value===sprawnosc.typSprawnosci)||{label:""}).label}
                            </p>
                        ) : (
                            <select name={"typSprawnosci"} value={form.typSprawnosci||"RED"} onChange={handleChange} className={"text-black"}>
                                {TYPY_SPRAWNOSCI.map((t) => (
                                    <option key={t.value} value={t.value}>
                                        {t.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>


                    {/* ZAPIS */}
                    {isEdit && (
                        <div className="flex gap-2 mt-2">
                            <button disabled={!form.nazwa || !form.opis || !form.opisWymagan}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-200"
                                    onClick={() => {
                                        sendForm()
                                        setEdit(false);
                                    }}
                            >
                                Zapisz
                            </button>

                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={() => {
                                    setEdit(false);
                                    setNewImage(null);
                                    setFormBase()
                                }}
                            >
                                Anuluj
                            </button>
                            <DeleteDialog id={sprawnosc.id} funkcjaDoUsunecia={deleteSprawnosci}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={() => {
                                }}
                            >
                                Usuń
                            </DeleteDialog>
                        </div>
                    )}
                </div>

                {/* PRAWA STRONA */}
                <div className="flex-1 flex justify-center items-center">
                    <div
                        onClick={() => isEdit && fileInputRef.current.click()}
                        className={`
                            w-48 h-48 sm:w-64 sm:h-64
                            rounded-lg overflow-hidden shadow-md
                            flex justify-center items-center
                            bg-[#1A1919]
                            ${isEdit ? "cursor-pointer ring-2 ring-blue-500 hover:opacity-80" : ""}
                        `}
                    >
                        <img
                            src={
                                newImage
                                    ? URL.createObjectURL(newImage)
                                    : `${process.env.NEXT_PUBLIC_BACKEND_PORT}${sprawnosc.ikonaUrl}`
                            }
                            alt={sprawnosc.nazwa}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </div>
            </div>
        </div>
    );
}
