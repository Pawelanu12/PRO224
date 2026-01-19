'use client'


import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {CzatContext} from "@/app/providers/ChatProvider";
import {Virtuoso} from "react-virtuoso";
import Message from "@/app/chat/websocket/Message";
import {FaPlus} from "react-icons/fa";
import {FaX} from "react-icons/fa6";

const getNazwa=(c,login)=>{
    if(c.nazwa)
        return c.nazwa;
    if(c.uczestnicyLogins) {
        return (c.uczestnicyLogins.filter(item => item !== login).toString());
    }
    return "";
}

export default function CzatWithWebSocket(){
    const {user}=useContext(GlobalContext)
    // const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState(null);
    const {getCzat,czat,loading,setCzat,czatId,addUserToCzat,wyzerujNieprzeczytane}=useContext(CzatContext)
    const dialog=useRef(null);
    const [newUser, setNewUser] = useState("");
    const handleInput = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleAddUser = () => {

        if (!newUser) return;
        addUserToCzat(czatId, newUser);
        setNewUser("");
    };
    useEffect(()=>{
        if(!czatId)return
            wyzerujNieprzeczytane(czatId)

    },[czatId])
    useEffect(() => {
        if(!czatId)return
        getCzat(czatId)
    }, [czatId]);
    useEffect(() => {
        if (!czatId) return;
        const stompClient = new Client({
            webSocketFactory: () =>
                new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/ws`),

            onConnect: () => {
                stompClient.subscribe(`/topic/chat/${czatId}`, (msg) => {
                    setCzat((prev) =>{ return{...prev,"wiadomosci":[...prev.wiadomosci||[], JSON.parse(msg.body)]}});
                });
            },

            onStompError: (frame) => {
                console.error(frame);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => stompClient.deactivate();
    }, [czatId]);

    const sendMessage = () => {
        if (client && message.trim()) {
            client.publish({
                destination: `/app/chat.send/${czatId}`,
                body: JSON.stringify({
                    uzytkownikId:user.id,
                    czatId:czatId,
                    tresc: message,

                }),
            });
            setMessage("");
        }
    };
    if (loading)
        return <p className="md:ml-[30vw] text-center">loading</p>;

    if (!czat)
        return <p className="md:ml-[30vw] text-center">czat nie znaleziony</p>;

    return (
        // backgroundColor: "#405E3F",
        <div className="mt-[100px] md:mt-0 md:ml-[30vw] flex h-[calc(100vh-100px)] md:h-[calc(100vh-50px)] md:w-[70vw] flex-col">
            {/*header*/}
            <div className="flex h-20 items-center justify-center gap-4 border-b border-black/20">
                <img className="rounded-full w-10 h-10"   src={czat.ikona||"/images/user_logo.png"} alt="ikona"/>
                <div className="min-w-[50%] max-w-[100%] px-2">
                    <p className="w-full text-center font-semibold line-clamp-1">
                        {user && getNazwa(czat, user.login)}
                    </p>

                </div>
                {czat.czyGrupowy&&<button
                    onClick={() => {
                        dialog.current.showModal();
                        document.body.style.overflow = "hidden";
                    }}
                    className="flex h-8 w-8 items-center justify-center
        rounded-full bg-green-600 text-white hover:bg-green-700 flex-shrink-0"
                    title="Dodaj użytkownika"
                >
                    <FaPlus size={14}/>
                </button>}

                <dialog ref={dialog}
                        className="fixed inset-0 bg-black/0  w-screen h-screen"

                        onCancel={() => document.body.style.overflow = "auto"}>
                    <div className="w-[100%]  flex flex-col h-[100%] items-center justify-center rounded-lg  p-4 ">
                      <div className={"bg-black/50 w-full max-w-[284px] p-2"}>
                       <div className="mb-3 flex items-center justify-between w-full ">
                            <p className="text-sm font-semibold text-white">
                                Dodaj użytkownika
                            </p>
                            <button
                                onClick={() => {
                                    dialog.current.close();
                                    document.body.style.overflow = "auto";
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                <FaX size={12}/>
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="login uzytkownika"
                            value={newUser}
                            onKeyUp={e=>{
                                if(e.key==="Enter"){
                                    handleAddUser()

                                }
                            }}
                            onChange={(e) => setNewUser(e.target.value)}
                            className="rounded-md bg-gray-700 px-3 py-2
                text-sm text-white outline-none bg-black w-full"
                        />

                        <button
                            onClick={handleAddUser}
                            className="mt-3 rounded-md
                bg-green-600 py-2 text-sm font-semibold text-white
                hover:bg-green-700 w-full"
                        >
                            Dodaj
                        </button>
                    </div>
                    </div>
                </dialog>
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
                                <Message wiadomosc={wiadomosc}/>
                            ) : (
                                <Message
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

