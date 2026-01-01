'use state'

import {useContext, useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ForumContext} from "@/app/providers/ForumProvider";
import {FaImage, FaImages} from "react-icons/fa";
import {FaX} from "react-icons/fa6";
import Opcji from "@/app/forum/Opcji";
import PisanieKomentarza from "@/app/forum/dialogs/PisanieKomentarza";
import {Virtuoso} from "react-virtuoso";
import Wiadomosc from "@/app/czat/websocket/Wiadomosc";
import Koment from "@/app/forum/Koment";
import Post from "@/app/forum/Post";
import PostInformacja from "@/app/forum/PostInformacja";
import DodawaniaPostu from "@/app/forum/dialogs/DodawaniaPostu";


export default function PostDialog({post}) {
    const {user}=useContext(GlobalContext);
    const {changeLike,setPosty}=useContext(ForumContext);

    const [comments, setComments] = useState([]);
    const dialog=useRef(null);




if(!post) return null;
    return(
        <div>
            <div>
                <button onClick={(e) => {
                    e.preventDefault();
                    dialog.current.showModal()
                    setComments(post.komentarze)
                    document.body.style.overflow = "hidden";
                }}>
                    ilosc komentarzy {post.komentarze.length}</button>
            </div>
    <dialog
        ref={dialog}
        className="fixed left-[20vw] top-[80px]
             h-[500px] w-[500px]
             "
        onClose={() => {
            // setShow(false)
            setPosty(prev => prev.map(p => p.id === post.id ? {...post, komentarze: comments} : p))
                    document.body.style.overflow = "auto";
                }}
                onCancel={(e) => {
                    setPosty(prev => prev.map(p => p.id === post.id ? {...post, komentarze: comments} : p))
                    document.body.style.overflow = "auto";
                }}
            >
                <div className={"flex flex-col h-[500px] w-[500px]"}>
                    <div className="relative h-12 flex-shrink-0">
                        <p className="text-center">Post {post.autor}</p>

                        <button
                            className="absolute right-4 top-2 rounded-full bg-gray-500 p-2"
                            onClick={() => dialog.current.close()}
                        >
                            <FaX/>
                        </button>
                    </div>


                    <div className="flex-1 overflow-hidden">
                        <Virtuoso
                            data={comments}
                            followOutput="auto"
                            className="h-full"
                            components={{
                                Header: () => (
                                    <div className={" bg-[#4D644C]"}>
                                        <PostInformacja post={post}/>
                                        <div className="mt-2 flex flex-wrap justify-around bg-[#3A4F39]">
                                            <button onClick={() => changeLike(post.id, user.id)}>
                                                ilość polubień {post.polubienia.length}
                                            </button>
                                            <button>Ilość komentarzy {comments.length}</button>
                                            <button>udostępnienia {post.udostepnienia}</button>
                                        </div>
                                    </div>
                                ),
                            }}
                            itemContent={(index, koment) => <Koment koment={koment}/>}
                        />
                    </div>

                    <PisanieKomentarza
                        id={post.id}
                        add={setComments}
                        className="flex-shrink-0"
                    />
                </div>
            </dialog>
        </div>

    )
}









