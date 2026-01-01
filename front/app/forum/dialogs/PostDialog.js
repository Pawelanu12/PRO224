'use state'

import {useContext, useRef, useState} from "react";
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

const compare_dates=(data_posta)=> {
    const date1 = new Date(data_posta);
    const date2 = new Date();
    const millis=date2.getTime()-date1.getTime();
    const dni=millis/(1000*60*60*24)|0;
    const godziny=millis/(1000*60*60)|0;
    if(dni>=1)
        return dni+ ' dni temu'
    if(dni===0&&godziny>0)
        return godziny+ ' godzin temu'
    return "mniej niż godzina temu"
}

export default function PostDialog({post}) {
    const {user}=useContext(GlobalContext);
    const [comments, setComments] = useState(post.komentarze);
    const {changeLike,setPosty}=useContext(ForumContext);
    const dialog=useRef(null);
    const [pelnyOpis,setPelnyOpis] = useState(false)
    const [show,setShow]=useState(false)

    const [index, setIndex] = useState(0);


    const next = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const images=post.zdjecia.map((z,i)=>{
        return  {"key":i, "src":"http://localhost:8080/uploads/posts/"+z, "alt":"cat","id":i}
    })



    return(
        <div >
            <div
                style={{
                    backgroundColor: "#4D644C",
                }}>

                <button style={{
                    // backgroundColor: "#336250",
                    // padding: "10px",
                    // margin:"5px",
                    // borderRadius:"30px"
                    backgroundColor: "#3A4F39"
                }} onClick={() => {
                    dialog.current.showModal();
                    document.body.style.overflow = "hidden";
                }}>ilosc komentarzy {post.komentarze.length}</button>

            </div>

            <dialog
                ref={dialog}
                style={{
                    left: "20vw",
                    top: "80px",
                    width: "500px",
                    height: "500px",
                    border: "none",
                    borderRadius: "10px",
                }}
                onClose={() => {
                    setPosty(prev=>prev.map(p=>p.id===post.id? {...post,komentarze:comments}:p))
                    document.body.style.overflow = "auto";
                }}
                onCancel={(e) => {
                    setPosty(prev=>prev.map(p=>p.id===post.id? {...post,komentarze:comments}:p))
                    document.body.style.overflow = "auto";
                }}
            >

                <div className={"w-[500px] h-12"} >
                    <p className={"text-center"}>Post {post.autor}</p>
                    <button className="absolute right-4 top-2 bg-gray-500 p-2 rounded-full"

                            onClick={() => {
                                dialog.current.close()
                            }}>
                        <FaX/>
                    </button>
                </div>



                <Virtuoso
                    components={{
                        Header: () => <div>
                            <PostInformacja post={post}/>
                            {/* Akcje: like, komentarze, udostępnienia */}

                        <div className={"flexRow"}
                            style={{justifyContent: "space-around", backgroundColor: "#3A4F39"}}>
                            <div>
                                <button onClick={(e) =>{e.preventDefault(); changeLike(post.id,user.id)}}>
                                    ilosc polubeń {post.polubienia.length}</button>
                            </div>
                            <div>
                                <button >
                                    Ilość komentarzy {comments.length}</button>
                            </div>
                            <div>
                                <button>ilosc udostepnien {post.udostepnienia}</button>
                            </div>
                        </div>
                    </div>
                    }}
                    data={comments}
                    style={{ height: 'calc(100% - 115px)' }}
                    followOutput="auto"
                    itemContent={(index, koment) =>
                       (
                            <Koment koment={koment}/>
                        )
                    }
                />
                <PisanieKomentarza id={post.id} add={setComments}/>
            </dialog>

        </div>
    )
}









