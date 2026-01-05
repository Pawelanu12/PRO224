'use client'

import { useContext, useRef, useState } from "react";
import { CzatContext } from "@/app/providers/CzatProvider";
import { GlobalContext } from "@/app/providers/GlobalProvider";

export default function NowyCzatDialog() {
    const { dodajCzat } = useContext(CzatContext);
    const { user } = useContext(GlobalContext);

    const dialog = useRef(null);
    const [inputUzytkownikow, setInputUzytkownikow] = useState("");
    const [nazwa,setNazwa] = useState("");
    const zamknijDialog = () => {
        setInputUzytkownikow("");
        dialog.current.close();
        document.body.style.overflow = "auto";
    };

    const createCzat = () => {
        const array=inputUzytkownikow.trim().split(" ")
            .map(a=>Number(a)).filter(a=>(!isNaN(a)&&a>0))
       const czatNazwa= nazwa&&nazwa.length>0?nazwa:array.toString()+","+user.id

        if(array.length>1) {

            dodajCzat({
                nazwa: czatNazwa,
                participantIds: array,
                creatorId: user.id,
            }, "/group");
        }
        if(array.length===1) {
            dodajCzat({
                user1Id: Number(inputUzytkownikow),
                user2Id: user.id,
            },"");
        }
    };

    return (
        <div>
            {/* Przycisk otwierający */}
            <button
                className="w-full border border-gray-400 rounded-lg py-2 mt-2 hover:bg-gray-100"
                onClick={() => {
                    dialog.current.showModal();
                    document.body.style.overflow = "hidden";
                }}
            >
                stwórz nowy czat
            </button>

            {/* Dialog */}
            <dialog
                ref={dialog}
                className="fixed inset-0 m-auto w-[90vw] max-w-md rounded-xl p-0 backdrop:bg-black/40"
                onClose={zamknijDialog}
                onCancel={zamknijDialog}
            >
                <div className="flex flex-col gap-4 p-6 bg-white rounded-xl">

                    {/* Header */}
                    <h2 className="text-lg font-semibold text-center">
                        Nowy czat prywatny
                    </h2>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Podaj ID użytkowników przez spacje"
                        value={inputUzytkownikow}
                        onChange={(e) => setInputUzytkownikow(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Wpisz nazwe czatu"
                        value={nazwa}
                        onChange={(e) => setNazwa(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Przyciski */}
                    <div className="flex justify-between gap-3 pt-2">
                        <button
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                            disabled={!inputUzytkownikow}
                            onClick={() => {
                                createCzat();
                                zamknijDialog();
                            }}
                        >
                            Dodaj
                        </button>

                        <button
                            className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
                            onClick={zamknijDialog}
                        >
                            Cofnij
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
