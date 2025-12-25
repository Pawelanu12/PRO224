'use client'


import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {useContext, useEffect, useState} from "react";
// import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function CzatWithWebSocket({id}){
    const {user}=useContext(GlobalContext)
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState(null);




    useEffect(() => {
        if (!id) return;
        const stompClient = new Client({
            webSocketFactory: () =>
                new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/ws`),

            onConnect: () => {
                stompClient.subscribe(`/topic/chat/${id}`, (msg) => {
                    // console.log(msg)
                    setMessages((prev) => [...prev, JSON.parse(msg.body)]);
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

    return (
        <div>
            <h2>Czat</h2>

            {messages.map((m, i) => (
                <div key={i}>
                    <b>{m.nadawca}:</b> {m.tresc}
                </div>
            ))}

            <input
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button

                onClick={sendMessage}
            >
                Wyślij
            </button>

        </div>
    );
}