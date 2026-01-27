'use client'

import { useContext, useRef, useState } from "react";
import { AdminContext } from "@/app/providers/AdminProvider";

export default function AddAchievementPage() {
    const { addSprawnosci } = useContext(AdminContext);

    const TYPY_SPRAWNOSCI = [
        { value: "RED", label: "CZERWONY" },
        { value: "YELLOW", label: "ŻÓŁTY" },
        { value: "GREEN", label: "ZIELONY" },
        { value: "BLUE", label: "NIEBIESKI" },
        { value: "PURPLE", label: "FIOLETOWY" },
    ];
    const [form, setForm] = useState({
        nazwa: "",
        opis: "",
        opisWymagan: "",
        typ: "RED",
    });

    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
    };

    const handleSubmit = () => {
        const formData = new FormData();

        Object.entries(form).forEach(([k, v]) => {
            formData.append(k, v);
        });

        if (image) {
            formData.append("ikona", image);
        }

        addSprawnosci(formData);
    };

    return (
        <div className="min-h-[calc(100vh-50px)] flex justify-center p-4 bg-[#1A1919]">

            {/* GŁÓWNY KONTENER */}
            <div
                className="relative max-w-4xl w-full bg-[#222822] rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-6 flex-wrap">

                {/* LEWA STRONA */}
                <div className="flex-1 flex flex-col gap-4 sm:max-w-[50%] w-full">

                    {/* NAZWA */}
                    <input
                        autoComplete="off"
                        name="nazwa"
                        value={form.nazwa}
                        onChange={handleChange}
                        placeholder="Nazwa sprawności"
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

                    {/* OPIS */}
                    <div className="bg-gray-100 p-3  rounded border border-gray-300">
                        <h2 className="font-semibold text-gray-700 mb-1">
                            Opis:
                        </h2>
                        <textarea
                            name="opis"
                            value={form.opis}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Opis dla użytkownika"
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
                    </div>

                    {/* WYMAGANIA */}
                    <div className="bg-gray-100 p-3 rounded border border-gray-300">
                        <h2 className="font-semibold text-gray-700 mb-1">
                            Wymagania:
                        </h2>
                        <textarea
                            name="opisWymagan"
                            value={form.opisWymagan}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Opis wymagań"
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
                    </div>

                    {/* TYP */}
                    <div className="bg-gray-100 p-3  rounded border border-gray-300">
                        <h2 className="font-semibold text-gray-700 mb-1">
                            Typ sprawności:
                        </h2>
                        <select name={"typ"} value={form.typ} onChange={handleChange} className={"text-black"}>
                            {TYPY_SPRAWNOSCI.map((t) => (
                                <option key={t.value} value={t.value}>
                                    {t.label}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* PRAWA STRONA – IKONA */}
                <div className="flex-1 flex justify-center items-center">
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="
                            w-48 h-48 sm:w-64 sm:h-64
                            rounded-lg
                            overflow-hidden
                            shadow-md
                            flex justify-center items-center
                            bg-[#1A1919]
                            cursor-pointer
                            ring-2 ring-blue-500
                            hover:opacity-80
                        "
                    >
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="ikona"
                                className="max-w-full max-h-full object-contain"
                            />
                        ) : (
                            <span className="text-gray-400 text-sm text-center px-4">
                                Kliknij aby dodać ikonę
                            </span>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </div>
                <div className={"w-screen  flex"}>
                    {/* ZAPIS */}
                    <button
                        disabled={!form.nazwa || !form.opis || !form.opisWymagan||!form.typ}
                        onClick={handleSubmit}
                        className="
                            mt-2
                            px-4 py-2
                            bg-green-600
                            text-white
                            rounded
                            hover:bg-green-700
                            disabled:bg-green-300
                        "
                    >
                        Dodaj sprawność
                    </button>
                </div>
            </div>

        </div>
    );
}
