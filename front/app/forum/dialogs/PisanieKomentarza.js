'use client'

import {useContext, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {FaMessage} from "react-icons/fa6";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {ForumContext} from "@/app/providers/ForumProvider";

export default function PisanieKomentarza({id,add}){
    const {user}=useContext(GlobalContext);
    const {writeComment} = useContext(ForumContext);
    const komment=useRef(null);
    const [message, setMessage] = useState("");
    const handleInput = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const write=()=>{
        const koment={tresc:message,postId:id,autorId:user.id,dataStworzenia:new Date()}
        writeComment(koment)
        add(prev=>[...prev,koment])
        setMessage("")
    }
    return (
        <div className="sticky bottom-0 flex gap-2 border-t
            border-gray-700 bg-gray-800 p-3">
                <textarea
                    className="max-h-[120px] flex-1 resize-none rounded-lg
                    bg-gray-700 px-4 py-2 text-sm text-white placeholder-gray-400
                    outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onInput={handleInput}
                    placeholder="Napisz koment..."
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            write();
                        }
                    }}
                />
            <button
                onClick={write}
                disabled={!message.trim()}
                className="flex h-10 w-10 items-center justify-center
                    rounded-full bg-blue-600 text-lg text-white transition
                    disabled:cursor-not-allowed disabled:bg-gray-600"
            >
                ➤
            </button>
        </div>
    )
}