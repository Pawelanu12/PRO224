'use state'

import {useContext, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ForumContext} from "@/app/providers/ForumProvider";
import {FaImage, FaImages} from "react-icons/fa";
import {FaX} from "react-icons/fa6";

export default function DodawaniaPostu() {
    const {user}=useContext(GlobalContext);
    const {addPosty}=useContext(ForumContext);
    const [files,setFiles]=useState([]);
    const [isTresc,setIsTresc]=useState(false);
    const tresc=useRef(null);
    const dialog=useRef(null);

    const dodajPost=()=>{
        console.log(files)
        console.log(user)
        const formData = new FormData();
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
        }

        formData.append("tresc", tresc.current.value);
        formData.append("autorId", user.id);

        addPosty(formData)
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
            <div
                style={{
                    backgroundColor: "#4D644C",
                    display:"flex",
                    flexDirection:"row",
                }}>

                <img src={"/images/ikona.png"} alt={"logo"} style={{
                    marginRight:"20px",height:"54px"

                }}/>
                <button style={{color: "red", zIndex: 13,
                    backgroundColor: "#336250",
                    padding: "10px",
                    margin:"5px",
                    borderRadius:"30px"
                }} onClick={() => {
                    dialog.current.showModal();
                    document.body.style.overflow = "hidden";
                    console.log(dialog.current.div)
                }}>chcesz dodać post?
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
                    Utworz post</p>
                    <button style={{backgroundColor:"grey",padding:"10px",marginRight:"10px",borderRadius:"30px"}}
                    onClick={() => {dialog.current.close()}}>
                    <FaX />
                    </button>
                </div>
                <div style={{margin: "2vh 2vw 2vh 2vw", width: "56vw", height: "30vh", overflowY: "scroll"}}>
                    <textarea
                        placeholder={"treść posta"}
                        style={{width: "100%", overflow: "hidden", resize: "none", border: "none", outline: "none"}}
                        rows={1} ref={tresc}
                        onChange={(e) => onChange(e)}/>
                    {files.length > 0 &&
                        <div>
                            <button style={{backgroundColor: "red"}} onClick={() => setFiles([])}>wyczysc pliki</button>
                            <div
                                style={{display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap"}}>
                                {files.map((file, i) => (
                                    <div style={{margin: "10px", width: "20vw"}} key={i}>
                                        <img key={i} src={URL.createObjectURL(file)} alt={file.name}/>
                                    </div>
                                ))}</div>
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

                            onClick={() => dodajPost()}>Opublikuj
                    </button>
                </div>

            </dialog>

        </div>
    )
}