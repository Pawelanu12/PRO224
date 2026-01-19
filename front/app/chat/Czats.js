'use client'



import {useContext, useEffect, useState} from "react";
import {CzatContext} from "@/app/providers/ChatProvider";
import NewChatDialog from "@/app/chat/NewChatDialog";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {FaXmark} from "react-icons/fa6";

//pokazuje wszystkich uzytkowników i gruppy
// do których pisales wczestniej lub jestes zarejestrowany

const getNazwa=(c,login)=>{
    if(c.nazwa)
        return c.nazwa;
    return (c.uczestnicyLogins.filter(item=>item!==login).toString());
}

export default function Czats(){
    const {czaty,getCzaty,setCzaty,setCzatId,removeFromCzat}=useContext(CzatContext)
    const [mobileOpen, setMobileOpen] = useState(false);

    const {user}=useContext(GlobalContext)
    useEffect(() => {
        getCzaty()
    }, [user?.id]);
    useEffect(() => {
        if(!user)return
        const stompClient = new Client({
            webSocketFactory: () =>
                new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/ws`),

            onConnect: () => {
                // console.log(`${user.id}/queue/chat-updates`)
                // stompClient.subscribe(`/user/queue/chat-updates`, (msg) => {
                stompClient.subscribe(`/topic/uzytkownik/${user.id.toString()}`, (msg) => {
                   console.log(msg)
                    const data = JSON.parse(msg.body);
                    console.log(data)
                    setCzaty(
                        prev=>prev.map(c=>c.id===data.czatId?{
                            ...c,
                            nieprzeczytaneWiadomosci:data.nieprzeczytaneWiadomosci,
                            lastMessageTime:data.wiadomosc.dataWyslania
                        }:c
                    ))
                });
            },

            onStompError: (frame) => {
                console.error(frame);
            },
        });

        stompClient.activate();
        return () => stompClient.deactivate();
    }, [user]);

    if (!czaty) return <div>Nie ma czatów</div>

    return (
        <div>
            <div className="md:hidden fixed top-[50px] left-0 w-full  z-40">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="w-full py-3 text-white font-semibold border-b border-black/20"
                >
                    Czaty
                </button>
            </div>
            {/* MOBILE OVERLAY */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 bg-[#4D644C] flex flex-col md:hidden">

                    {/* Header */}
                    <div className="h-14 flex items-center justify-between px-4 border-b border-black/20">
                        <p className="text-white font-semibold">Czaty</p>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="text-white text-xl"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Nowy czat */}
                    <div className="p-4">
                        <NewChatDialog />
                    </div>
                    {/* Lista czatów */}
                    <div className="flex-1 overflow-y-auto border-black border-t">
                        {[...czaty].sort((a,b)=>{
                           return  new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
                        }).map(c => (
                            <div
                                key={c.id}
                                className="flex items-center border-black  border-b gap-3 px-3 py-2 hover:bg-[#405E3F]"
                            >
                                <div
                                    onClick={() => {
                                        setCzatId(c.id);
                                        setMobileOpen(false);
                                    }}
                                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                                >
                                    <img
                                        src={c.obraz||"/images/user_logo.png"}
                                        className="w-12 h-12 rounded-full flex-shrink-0"
                                        alt=""
                                    />
                                    <div className="flex-1 min-w-0 ">
                                        <p className="text-sm font-semibold text-white truncate">
                                            {getNazwa(c, user?.login)}
                                        </p>

                                        {c.lastReadMessage && (
                                            <p className="text-sm text-gray-300 line-clamp-1">
                                                {c.lastReadMessage.tresc}
                                            </p>
                                        )}
                                    </div>

                                </div>
                                {c.nieprzeczytaneWiadomosci > 0 && (
                                    <div
                                        className="min-w-[24px] h-6 px-2 text-xs flex items-center justify-center
                               rounded-full bg-red-600 text-white flex-shrink-0"
                                    >
                                        {c.nieprzeczytaneWiadomosci}
                                    </div>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCzat(c.id,user.id);
                                    }}
                                    className="text-white/70 hover:text-red-500 p-2 flex-shrink-0"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="hidden md:block fixed left-0 top-0 h-screen w-[30vw] overflow-y-auto bg-[#4D644C]">

                {/* Header */}
                <div className="h-20 flex mt-12 items-center px-4">
                    <NewChatDialog/>
                </div>
                <div className={"border-t border-black"}>
                {/* Lista czatów */}
                    {[...czaty].sort((a,b)=>{
                        return  new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
                    }).map(c => (
                        <div
                            key={c.id}
                            onClick={() => setCzatId(c.id)}
                            className="flex items-center border-b border-black gap-3 px-3 py-2 cursor-pointer hover:bg-[#405E3F]"
                        >
                            {/* Avatar */}
                            <img
                                src={c.obraz||"/images/user_logo.png"}
                                alt="avatar"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            {/* Środek */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">
                                    {getNazwa(c, user?.login)}
                                </p>

                                {c.lastReadMessage && (
                                    <p className="text-sm text-gray-300 line-clamp-1">
                                        {c.lastReadMessage.tresc}
                                    </p>
                                )}
                            </div>

                            {/* Badge */}
                            {c.nieprzeczytaneWiadomosci > 0 && (
                                <div
                                    className="min-w-[24px] h-6 px-2 text-xs flex items-center justify-center rounded-full bg-red-600 text-white">
                                    {c.nieprzeczytaneWiadomosci}
                                </div>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromCzat(c.id,user.id);
                                }}
                                className="text-white/70 hover:text-red-500 transition p-2"
                                title="Wyjdź z czatu"
                            >
                                <FaXmark className="text-lg"/>
                            </button>
                        </div>


                    ))}
                </div>
            </div>
        </div>
    )
}
