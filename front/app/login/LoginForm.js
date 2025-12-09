'use state'

import {useContext, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ForumContext} from "@/app/providers/ForumProvider";
import {FaImage, FaImages} from "react-icons/fa";
import {FaX} from "react-icons/fa6";

export default function LoginForm() {
    const {replaceClick,logIn}=useContext(GlobalContext)

    const dialog=useRef(null);


    return(
        <div >

                <button style={{color: "red",
                    backgroundColor: "#336250",
                    padding: "10px",
                    margin:"5px",
                    borderRadius:"30px"
                }} onClick={() => {
                    dialog.current.showModal();
                    document.body.style.overflow = "hidden";
                    console.log(dialog.current.div)
                }}>login
                </button>
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

                <Formik
                    initialValues={{
                        login: "",
                        haslo: "",
                    }}
                    validationSchema={Yup.object({

                        login: Yup.string()
                            .required("Login jest wymagany"),
                        haslo: Yup.string()
                            .required("Haslo jest wymagane"),


                    })}
                    onSubmit={(values, {resetForm}) => {


                        console.log(values)
                        dialog.current.close()
                        logIn(values)
                        resetForm()
                    }}

                >
                    {({dirty, isValid}) => (
                        <Form style={{
                            alignItems: "center", display: "flex", flexDirection: "column",
                            backgroundColor: "#405E3F", justifyContent: "center", margin: "10%"
                        }}>
                            <p>Login</p>
                            <Field className={"field"} type="text" name="login" placeholder="napisz login"
                            />
                            <ErrorMessage name="login" component="div"/>
                            <br/>
                            <p>Haslo</p>
                            <Field className={"field"} type="password" name="haslo" placeholder="napisz haslo"
                            />
                            <ErrorMessage name="haslo" component="div"/>
                            <br/>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "80%",
                                marginTop: "10px"
                            }}>
                                <p onClick={(e) => replaceClick(e, "/rejestracja")}
                                   className={"zarejestruj"}>Zarejestruj sie
                                </p>
                                <p onClick={(e) => replaceClick(e, "/password-change")}
                                   className={"nie_pamietasz_haslo"}>nie pamiętasz hasla
                                </p>
                            </div>
                            <br/>
                            <button style={{backgroundColor: "#354545", width: "80%"}} type="submit"
                                    disabled={!dirty || !isValid}
                            >Log In
                            </button>
                            <br/>
                        </Form>)}


                </Formik>
            </dialog>

        </div>
    )
}