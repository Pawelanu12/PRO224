'use client'

import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useContext, useRef} from "react";
import Navigation from "@/app/forum/Navigation";
import {red} from "next/dist/lib/picocolors";
import {ForumContext} from "@/app/providers/ForumProvider";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function DodajPost() {
    const {addPosty}= useContext(ForumContext);
    const {user}=useContext(GlobalContext)
    const text=useRef("")
    const img =useRef(null);
    //wyswetla inny obrazek
    const change=(event)=>{
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    console.log(img)

                    img.current.src = e.target.result;

                    console.log(img)
                }
                reader.readAsDataURL(file);
            }
        }
        //dodawnie posta
        const onSubmit=(e)=>{
            e.preventDefault()
            console.log(text.current.value)
            addPosty({
                autorId:user.id,
                tresc:text.current.value,
                img:img.current.src,
         })
        }
    return (
        <div>
            <Navigation/>
            <div style={{paddingTop:'75px',paddingLeft:'calc(250px + 10%)',height:'100%',paddingRight:'10%'}}>
                <div style={{backgroundColor:"#4D644C",marginLeft:"15%",width:"350px",marginRight:"15%",padding:"20px"}}>
                    <div style={{backgroundColor: "#3A4F39", height: '100%', minHeight: '500px', textAlign: "center"}}>
                        <label><textarea style={{width: "294px", height: "100px"}} placeholder={"opis posta"} ref={text}/></label>
                        <label htmlFor="fileInput" style={{cursor: "pointer",display: "inline-block",
                            width: "50px",
                            height: "50px" }}>
                            <img
                                src="/images/wstaw_obraz.png"
                                alt="Upload"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "8px"
                                }}
                            />
                        </label>
                        <input onChange={(e) => change(e)}
                               type="file" id="fileInput" accept="image/*" style={{display:"none"}}/>
                        <div id="preview"
                             style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "21pxs"}}>
                            <img ref={img} alt=""
                                 style={{maxWidth: "250px", width: "100%", height: "auto", justifyContent: "center",}}/>
                        </div>
                        <button type={'submit'} onClick={(e)=>onSubmit(e)}>dodaj</button>
                    </div>
                </div>
            </div>


        </div>
    )
}
