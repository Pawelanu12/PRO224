'use client'


import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useState } from "react";

export default function CzatWithWebSocket(){
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState(null);
    useEffect(() => {
        const stompClient = new Client({
            webSocketFactory: () =>
                new SockJS("http://localhost:8080/ws"),

            onConnect: () => {
                stompClient.subscribe("/topic/public", (msg) => {
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
    }, []);

    const sendMessage = () => {
        if (client && message.trim()) {
            client.publish({
                destination: "/app/chat.send",
                body: JSON.stringify({
                    sender: "User",
                    content: message,
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
                    <b>{m.sender}:</b> {m.content}
                </div>
            ))}

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Wyślij</button>
        </div>
    );
}