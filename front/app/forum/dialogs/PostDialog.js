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

export default function PostDialog({post,compare_dates}) {
    const {user}=useContext(GlobalContext);

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
                    top: "20vh",
                    width: "60vw",
                    height: "60vh",
                    border: "none",
                    borderRadius: "10px",
                }}
                onClose={() => {
                    document.body.style.overflow = "auto";
                }}
                onCancel={(e) => {
                    document.body.style.overflow = "auto";
                }}
            >

                <div style={{width: "60vw", height: "7vh"}}>
                    <p style={{textAlign:"center"}}>Post {post.autor}</p>
                    <button style={{
                        position: "absolute",
                        backgroundColor: "grey",
                        padding: "10px",
                        marginTop: "10px",
                        borderRadius: "30px",
                        right: "10px",
                        top:"0px"
                    }}
                            onClick={() => {
                                dialog.current.close()
                            }}>
                        <FaX/>
                    </button>
                </div>
                <div style={{width: "60vw", height: "53vh",overflowY: "scroll"}}>

                    <div>

                        <div style={{alignItems: "center"}}>
                            <div style={{flex: 60}}>
                                <div className={'flexRow'}>
                                    <img src={post.ikona} alt="ikona" className={'ikona'} style={{margin: 0}}/>
                                    <div>
                                        <div className={"flexRow"}>
                                            <p>autor:{post.autorId}</p>
                                            {post.autorId !== user.id &&
                                                <button
                                                    style={{paddingLeft: "20px", color: "#88D79D"}}>Obserwuj</button>}
                                        </div>
                                        <p>{compare_dates(post.dataStworzenia)}</p>
                                    </div>

                                </div>

                            </div>
                            <p style={
                                pelnyOpis ? {wordBreak: "break-word", height: "auto", marginLeft: "10px"} :
                                    {
                                        marginLeft: "10px",
                                        wordBreak: "break-word",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,       // ile linii pokazać
                                        WebkitBoxOrient: "vertical"
                                    }}
                            >{post.tresc}</p>
                            <button style={{color: "grey"}}
                                    onClick={() => setPelnyOpis(!pelnyOpis)}>
                                {pelnyOpis ? "pokaż mniej" : "pokaż węcej"}</button>
                        </div>
                        <div style={{flex: 20, textAlign: "right"}}>
                            {/*{show && <Opcji autor={post.autorId} post={post}/>}*/}
                            {/*<button onClick={() => setShow(!show)} style={{fontSize: "50px"}}> . . .</button>*/}
                        </div>

                    </div>
                    {images.length>0&& <div style={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        borderRadius: "10px"
                    }}>
                        <img
                            src={images[index].src}
                            alt={images[index].alt}
                            style={{width: "100%", height: "100%", objectFit: "contain",borderRadius:"20px"}}
                        />
                        {images.length>1&&<div><button
                            onClick={prev}
                            style={{
                                position: "absolute",
                                left: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "rgba(0,0,0,0.4)",
                                color: "white",
                                border: "none",
                                padding: "10px",
                                cursor: "pointer"
                            }}
                        >
                            ◀
                        </button>

                        {/* RIGHT ARROW */}
                        <button
                            onClick={next}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "rgba(0,0,0,0.4)",
                                color: "white",
                                border: "none",
                                padding: "10px",
                                cursor: "pointer"
                            }}
                        >
                            ▶
                        </button>
                       </div>}
                    </div>}
                    <div className={"flexRow"}
                         style={{
                             justifyContent: "space-around",
                             marginTop: "10px",
                             marginBottom: "75px",
                             backgroundColor: "#3A4F39"
                         }}>
                        <div>
                            <button onClick={() => console.log("like")}>
                                ilosc polubeń {post.iloscPolubien}</button>
                        </div>
                        <div>
                            <button onClick={() => {
                                dialog.current.close()
                            }}>ilosc komentarzy {post.komentarze.length}</button>
                        </div>
                        <div>
                            <button>ilosc udostepnien {post.udostepnienia}</button>
                        </div>
                    </div>
                    {post.komentarze.length > 0 && <div>
                        {post.komentarze.map((k, i) => (<div key={i}>koment</div>))}
                    </div>}
                </div>
                <PisanieKomentarza/>
            </dialog>

        </div>
    )
}