'use client'



import {useContext, useEffect, useState} from "react";
import {CzatContext} from "@/app/providers/CzatProvider";
import NowyCzatDialog from "@/app/czat/NowyCzatDialog";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
//pokazuje wszystkich uzytkowników i gruppy
// do których pisales wczestniej lub jestes zarejestrowany
const getNazwa=(c,login)=>{
    if(c.nazwa)
        return c.nazwa;
    return (c.uczestnicyIds.filter(item=>item!==login).toString());
}

export default function Czaty(){
    const {czaty,getCzaty,setCzat,setCzaty}=useContext(CzatContext)
    const {user}=useContext(GlobalContext)
    useEffect(() => {
        getCzaty()
    }, [user]);
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
                        prev=>prev.map(c=>c.id===data.czat_id?{
                            ...c,
                            nieprzeczytane_wiadomosci:data.nieprzeczytane_wiadomosci,
                            wiadomosc:data.wiadomosc
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
        <div className="fixed left-0 top-0 h-screen w-[30vw] overflow-y-auto bg-[#4D644C]">

            {/* Header */}
            <div className="h-20 flex mt-12 items-center px-4">
                <NowyCzatDialog />
            </div>

            {/* Lista czatów */}
            {czaty.map(c => (
                <div
                    key={c.id}
                    onClick={() => setCzat(c)}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#405E3F]"
                >
                    {/* Avatar */}
                    <img
                        src={c.obraz}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                    />

                    {/* Środek */}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                            {getNazwa(c, user.login)}
                        </p>

                        {c.wiadomosc && (
                            <p className="text-sm text-gray-300 line-clamp-1">
                                {c.wiadomosc.tresc}
                            </p>
                        )}
                    </div>

                    {/* Badge */}
                    {c.nieprzeczytane_wiadomosci > 0 && (
                        <div className="min-w-[24px] h-6 px-2 text-xs flex items-center justify-center rounded-full bg-red-600 text-white">
                            {c.nieprzeczytane_wiadomosci}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
