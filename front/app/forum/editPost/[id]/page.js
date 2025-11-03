'use client'

import {useContext, useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik, FormikContext} from "formik";
import * as Yup from "yup";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ForumContext} from "@/app/providers/ForumProvider";
import DeleteDialog from "@/app/functions/DeleteDialog";
export default function EditSprawnosc(){
    const {edit,setEdit,replaceClick}=useContext(GlobalContext)
    const {editPost,deletePost}=useContext(ForumContext)
    useEffect(() => {
        if(!edit||!edit.id)
            replaceClick("","/forum")
    }, []);
    return (
        <div>
            <NavbarZarejestrowana/>

            <div className={"forma_dodawania"} style={{backgroundColor:"green",paddingTop:"50px"}}>
                <DeleteDialog id={edit.id} funkcjaDoUsunecia={deletePost}/>

                <Formik

                    initialValues={{
                        tresc: edit.tresc||"",
                    }}
                    validationSchema={Yup.object({
                        tresc: Yup.string()
                            .required("to pole jest wymagane"),

                    })}
                    onSubmit={(values, {resetForm}) => {
                            console.log(values)

                            editPost(edit.id, {...edit,tresc:values.tresc});
                            setEdit({});
                            resetForm()
                    }}

                >
                    {({dirty, isValid,errors,touched,handleChange,values}) => (
                        <Form className={"formik"}>
                                    <p> Tresc posta</p>
                                    <Field as="textarea"  cols={"100"} style={{maxWidth:"80vw", height:"400px"}}   className={"pole-formy-dodawnia"}  name="tresc" placeholder="napisz tresc posta"
                                    />
                                    <ErrorMessage className={"error"} name="tresc" component="div"/>
                            <br/>
                            <button type="submit" disabled={!dirty || !isValid}
                            >edit post
                            </button>
                        </Form>)}


                </Formik>
            </div>
        </div>
    )
}
// <PoleWDodawaniu nazwaPola={"typSprawnosci"} state={typSprawnosci} setState={setTypeSprawnosci}/>


