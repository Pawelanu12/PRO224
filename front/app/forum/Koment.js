'use client'

import { FaEdit, FaTrash } from "react-icons/fa";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function Koment({ koment,  }) {
    console.log(koment);
    const {user}=useContext(GlobalContext);
    return (
        <div className="flex justify-between items-start p-2 border-b border-gray-200 hover:bg-gray-50 rounded-md">
            <div className="flex-1">
                <b>{koment.autorId}: </b>
                <span className="whitespace-pre-wrap break-all">{koment.tresc}</span>
            </div>

            {user.id===koment.autorId&&<div className="flex space-x-2 ml-4">
                {/* Przycisk edycji */}
                <button
                    // onClick={() => onEdit && onEdit(koment)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-md"
                    title="Edytuj komentarz"
                >
                    <FaEdit/>
                </button>

                {/* Przycisk usunięcia */}
                <button
                    // onClick={() => onDelete && onDelete(koment)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-md"
                    title="Usuń komentarz"
                >
                    <FaTrash/>
                </button>
            </div>}
        </div>
    );
}
