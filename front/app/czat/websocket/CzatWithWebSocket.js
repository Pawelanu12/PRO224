'use client'


import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {useContext, useEffect, useState} from "react";
// import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {CzatContext} from "@/app/providers/CzatProvider";
import {Virtuoso} from "react-virtuoso";
import DodawaniaPostu from "@/app/forum/dialogs/DodawaniaPostu";
import Post from "@/app/forum/Post";
import Wiadomosc from "@/app/czat/websocket/Wiadomosc";

const getNazwa=(c,login)=>{
    if(c.nazwa)
        return c.nazwa;
    if(c.uczestnicyIds) {
        // console.log((c.uczestnicyIds.filter(item => item !== login));
        return (c.uczestnicyIds.filter(item => item !== login).toString());
    }
    return "";
}

export default function CzatWithWebSocket(){
    const {user}=useContext(GlobalContext)
    // const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState(null);
    const {getCzat,czat,loading,setCzat}=useContext(CzatContext)

    const id=czat.id
    useEffect(()=>{
        if (!id) return;
            getCzat(id);
    },[id])
    const handleInput = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    useEffect(() => {
        if (!id) return;
        const stompClient = new Client({
            webSocketFactory: () =>
                new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/ws`),

            onConnect: () => {
                stompClient.subscribe(`/topic/chat/${id}`, (msg) => {
                    setCzat((prev) =>{ return{...prev,"wiadomosci":[...prev.wiadomosci, JSON.parse(msg.body)]}});
                });
            },

            onStompError: (frame) => {
                console.error(frame);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => stompClient.deactivate();
    }, [id]);

    const sendMessage = () => {
        if (client && message.trim()) {
            client.publish({
                destination: `/app/chat.send/${id}`,
                body: JSON.stringify({
                    uzytkownikId:user.id,
                    czatId:id,
                    tresc: message,

                }),
            });
            setMessage("");
        }
    };
    if (loading)
        return <p className="ml-[30vw] text-center">loading</p>;

    if (!czat)
        return <p className="ml-[30vw] text-center">czat nie znaleziony</p>;

    return (
        // backgroundColor: "#405E3F",
        <div className="ml-[30vw] flex h-[calc(100vh-50px)] w-[70vw] flex-col">
            {/*header*/}
            <div className="flex h-20 items-center justify-center gap-4 border-b border-black/20">
                <img className="ikona" src={czat.ikona} alt="ikona"/>
                <div className="min-w-[50%]">
                    <p className="text-center font-semibold">
                        {getNazwa(czat, user.login)}
                    </p>
                </div>
            </div>
            {/*czat*/}
            <div className="flex-1 overflow-hidden">
                {czat.wiadomosci && (
                    <Virtuoso
                        style={{height: "100%"}}
                        data={czat.wiadomosci}
                        followOutput="auto"
                        initialTopMostItemIndex={czat.wiadomosci.length - 1}
                        itemContent={(i, wiadomosc) =>
                            i === 0 ? (
                                <Wiadomosc wiadomosc={wiadomosc}/>
                            ) : (
                                <Wiadomosc
                                    wiadomosc={wiadomosc}
                                    wiadomosc2={czat.wiadomosci[i - 1]}
                                />
                            )
                        }
                    />
                )}
            </div>
            {/* INPUT */}
            <div className="sticky bottom-0 flex gap-2 border-t
            border-gray-700 bg-gray-800 p-3">
                <textarea
                    className="max-h-[120px] flex-1 resize-none rounded-lg
                    bg-gray-700 px-4 py-2 text-sm text-white placeholder-gray-400
                    outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onInput={handleInput}
                    placeholder="Napisz wiadomość..."
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="flex h-10 w-10 items-center justify-center
                    rounded-full bg-blue-600 text-lg text-white transition
                    disabled:cursor-not-allowed disabled:bg-gray-600"
                >
                    ➤
                </button>
            </div>
        </div>
    );
}

