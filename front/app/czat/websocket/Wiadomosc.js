'use client'

import {FaPencil} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import {useContext, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {CzatContext} from "@/app/providers/CzatProvider";

export default function Wiadomosc({ wiadomosc, wiadomosc2 }) {
    const [show, setShow] = useState(false);
    const {user}=useContext(GlobalContext);
    const {editWiadomosc,deleteWiadomosc}=useContext(CzatContext)
    const showHeader =
        !wiadomosc2 || wiadomosc2.nadawca !== wiadomosc.nadawca;

    return (
        <div className="flex gap-3 px-4 py-1">

            {/* AVATAR */}
            {showHeader ? (
                <img
                    src={wiadomosc.avatar || "/images/ikona.png"}
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
              {wiadomosc.dataWyslania}
            </span>
                    </div>
                )}

                {/* MESSAGE BUBBLE */}
                <div className="w-full justify-between bg-gray-700  rounded-2xl  text-sm text-white "
                onMouseMove={()=>setShow(true)}
                onMouseLeave={()=>setShow(false)}>
                    {show&&user&&user.login===wiadomosc.nadawca&&
                        <div
                            className={"-mt-[10px] right-10  absolute flex flex-row "}>
                            <div className={"cursor-pointer  border-[1px] border-[#000000] border-solid p-1"}>
                                <FaPencil/></div>
                            <div className={"cursor-pointer  border-[1px] border-[#000000] border-solid p-1"}>
                                <FaTrash/></div>
                        </div>
                            }
                            <div className="
              {/*max-w-[75%]*/}

              px-3 py-2

              whitespace-pre-wrap
              break-all
              overflow-hidden
            ">
                                {wiadomosc.tresc}
                            </div>

                        </div>
                        </div>
                        </div>
                        );
                    }
