'use client'

import {FaMessage, FaPencil} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {CzatContext} from "@/app/providers/ChatProvider";

export default function Message({ wiadomosc, wiadomosc2 }) {
    const [show, setShow] = useState(false);
    const {user}=useContext(GlobalContext);
    const [edit, setEdit] = useState(false);
    const [value,setValue] = useState("");
    const tekst=useRef(null)
    const {editWiadomosc,deleteWiadomosc,setCzat,openCzat}=useContext(CzatContext)
    const date=new Date(wiadomosc.dataWyslania);
    const showHeader =
        !wiadomosc2 || wiadomosc2.nadawca !== wiadomosc.nadawca||
    new Date(wiadomosc2.dataWyslania).getDate()!==date.getDate();
    useEffect(() => {
        if (tekst.current) {
            tekst.current.focus();
            tekst.current.value = wiadomosc.tresc;
            tekst.current.style.height = "auto";
            tekst.current.style.height = `${tekst.current.scrollHeight}px`;
        }
    }, [edit]);

    const handleInput = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };
    const onChange=e=>{
        setValue(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    }
    return (

        <div className="flex gap-3 px-4 py-1">
            {/* AVATAR */}
            {showHeader ? (
                <img
                    src={wiadomosc.avatar || "/images/user_logo.png"}
                    alt="avatar"
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
            ) : (
                <div className="w-10 shrink-0" />
            )}

            {/* CONTENT */}
            <div className="flex min-w-0 flex-col w-full">

                {showHeader && (
                    <div className="mb-1 flex items-center gap-2 text-sm w-full">
            <span className="font-semibold line-clamp-1">
              {wiadomosc.nadawca}
            </span>
                        <span className="text-xs text-gray-400">
                      {date.getDate()+"."+date.getMonth()+1+"."+date.getFullYear()+", "+date.getHours()+":"+String(date.getMinutes()).padStart(2, '0')}

            </span>
                    </div>
                )}

                {/* MESSAGE */}
               <div className="w-full justify-between bg-gray-700  rounded-2xl  text-sm text-white "
                onMouseMove={()=>setShow(true)}
                onMouseLeave={()=>setShow(false)}>
                   {!edit&&show&&user&&user.login!==wiadomosc.nadawca&&
                       <div
                           className={"-mt-[10px] right-10  absolute flex flex-row "}>
                           <div onClick={()=>{
                               openCzat(wiadomosc.nadawca)
                           }}
                                className={"cursor-pointer  border-[1px] border-[#000000] border-solid p-1"}>
                               <FaMessage/>
                           </div>
                       </div>
                   }

                   {!edit&&show&&user&&user.login===wiadomosc.nadawca&&
                        <div
                            className={"-mt-[10px] right-10  absolute flex flex-row "}>
                            <div className={"cursor-pointer  border-[1px] border-[#000000] border-solid p-1"}
                            onClick={()=>{setEdit(true);
                            }}>
                                <FaPencil/></div>
                            <div onClick={()=>{deleteWiadomosc(wiadomosc.id);
                                setCzat(prev=>{return{...prev,wiadomosci:prev.wiadomosci.filter(w=>w!==wiadomosc)}})
                                }}
                                 className={"cursor-pointer  border-[1px] border-[#000000] border-solid p-1"}>
                                <FaTrash/>
                            </div>
                        </div>
                    }
                   {!edit && (
                       <div
                           className="
                                px-3 py-2
                                whitespace-pre-wrap
                                break-all
                                overflow-hidden
                            "
                       >
                           {wiadomosc.tresc}
                       </div>
                   )}

                   {edit && (
                       <textarea ref={tekst}

                           className="
                                px-3 py-2
                                w-full
                                resize-none
                                bg-transparent
                                outline-none
                                whitespace-pre-wrap
                                break-all
                                overflow-hidden
                                overflow-y-scroll"
                                 rows={1}
                         onKeyDown={(e) => {
                             if (e.key === "Enter" && !e.shiftKey) {
                               e.preventDefault();
                               setEdit(false);
                               editWiadomosc(wiadomosc.id, value);
                               setCzat(prev=>{return{...prev,
                                   wiadomosci:prev.wiadomosci.map(w=>w.id===wiadomosc.id?{...wiadomosc,tresc:value}:w)}})
                            }
                           if (e.key === "Escape") {
                               setEdit(false);
                           }
                        }}
                        onChange={onChange}
                       />

                   )}

               </div>
            </div>
        </div>
    );
}
