'use state'

import {useContext, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ForumContext} from "@/app/providers/ForumProvider";
import {FaImage, FaImages} from "react-icons/fa";
import {FaX} from "react-icons/fa6";

export default function EditPost({post}) {
    const {user}=useContext(GlobalContext);
    const {editPost,deletePost}=useContext(ForumContext)
    const [oldfiles,setOldFiles] = useState([]);
    const [files,setFiles]=useState([]);
    const [picturesToBeRemoved,setPicturesToBeRemoved] = useState([])
    const [isTresc,setIsTresc]=useState(true);
    const tresc=useRef("");
    const dialog=useRef(null);

    const edit=()=>{
        console.log(files)
        console.log(user)
        console.log(picturesToBeRemoved)
        const formData = new FormData();
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("newPictures", files[i]);
            }
        }
        if (picturesToBeRemoved) {
            for (let i = 0; i < picturesToBeRemoved.length; i++) {
                formData.append("picturesToBeRemoved", picturesToBeRemoved[i]);
            }
        }
        formData.append("tresc", tresc.current.value);
        // formData.append("autorId", user.id);

        editPost(post.id,formData)
        dialog.current.close()
    }
    const onChange=(e)=>{
        if (isTresc && e.target.value.length === 0) {
            setIsTresc(false);
        } else if (!isTresc && e.target.value.length > 0) {
            setIsTresc(true);
        }
        tresc.current.style.height="auto"
        tresc.current.style.height=tresc.current.scrollHeight+"px";

    }
    return(
        <div >
            <div>
                <button style={{color: "red", zIndex: 13,
                    // backgroundColor: "#336250",
                    // padding: "10px",
                    // margin:"5px",
                    // borderRadius:"30px"
                }} onClick={() => {
                    dialog.current.showModal();
                    document.body.style.overflow = "hidden";
                    console.log(dialog.current.div)
                    console.log(post)
                    tresc.current.value=post.tresc
                    tresc.current.style.height="auto"
                    tresc.current.style.height=tresc.current.scrollHeight+"px";
                    setOldFiles(post.zdjecia.map((z,i)=>{return {"index":i,"src":z}}))
                    console.log(oldfiles)
                }}>edituj post
                </button>
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
                <div style={{height: "7vh", marginTop: "1vh",display:"flex",alignItems:"center",
                    flexDirection:"row",justifyContent:"space-between"}}>
                    <p></p>
                    <p style={{textAlign: "center"}}>
                        Edituj post</p>
                    <button style={{backgroundColor:"grey",padding:"10px",marginRight:"10px",borderRadius:"30px"}}
                            onClick={() => {dialog.current.close()}}>
                        <FaX />
                    </button>
                </div>
                <div style={{margin: "2vh 2vw 2vh 2vw", width: "56vw", height: "30vh", overflowY: "scroll"}}>
                    <textarea
                        // defaultValue={post.tresc}
                        placeholder={"treść posta"}
                        style={{width: "100%", overflow: "hidden", resize: "none", border: "none", outline: "none"}}
                        rows={1} ref={tresc}
                        onChange={(e) => onChange(e)}/>
                    {(files.length > 0||oldfiles.length>0) &&
                        <div>
                            <div
                                style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>

                                    {post.zdjecia.filter(z=>!picturesToBeRemoved.includes(z)).map((img, i) => (
                                        <div style={{margin: "10px", width: "20vw"}} key={i}>
                                            <button style={{
                                                backgroundColor: "grey",
                                                padding: "10px",
                                                marginRight: "10px",
                                                borderRadius: "30px",
                                                position: "relative"
                                            }}
                                                    onClick={() => {
                                                        setPicturesToBeRemoved(prev=>[...prev,img])
                                                        // setOldFiles(oldfiles.filter((v) => v.index !== img.index))
                                                    }}>
                                                <FaX/>
                                            </button>
                                            <img style={{
                                                marginTop: "-50px",
                                            }} key={i} src={"http://localhost:8080/uploads/posts/" + img}
                                                 alt={img}/>

                                        </div>
                                    ))}
                                </div>


                                {files.length > 0 &&
                                    <div>
                                        <p style={{textAlign:"center",backgroundColor:"red"}}>Nowe pliki</p><br/>
                                        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                                            {files.map((file, i) => (
                                                <div style={{margin: "10px", width: "20vw",}} key={i}>
                                                    <button style={{
                                                        backgroundColor: "grey",
                                                        padding: "10px",
                                                        marginRight: "10px",
                                                        borderRadius: "30px",
                                                        position: "relative"
                                                    }}
                                                            onClick={() => {
                                                                setFiles(prev=>prev.filter((v) => v !== file))
                                                            }}>
                                                        <FaX/>
                                                    </button>
                                                    <img style={{marginTop: "-50px"}} key={i}
                                                         src={URL.createObjectURL(file)} alt={file.name}/>

                                                </div>
                                            ))}
                                        </div>
                                    </div>}
                            </div>
                        </div>}
                </div>
                <div style={{margin: "2vw", width: "56vw", height: "10vh"}}>
                    <label>
                        <div style={{display: "flex", justifyContent: "space-between"}}><p>Dodaj do posta </p>

                            <FaImages fontSize={"30px"}/></div>

                        <input type="file" accept="image/*" multiple={true}
                               className={"pole-formy-dodawnia"}
                               onChange={(e) => {
                                   setFiles(prev => [...prev, ...Array.from(e.target.files)]);

                               }}
                               style={{opacity: 0}}
                               name="ikona" placeholder="wstaw ikone"
                        />
                    </label>
                    <button style={isTresc ? {width: "100%", backgroundColor: "blue"}
                        : {width: "100%", backgroundColor: "grey", pointerEvents: "none"}}

                            onClick={() => edit()}>Edituj
                    </button>
                </div>

            </dialog>

        </div>
    )
}