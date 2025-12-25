'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {PasswordChangeContext} from "@/app/providers/PasswordChangeProvider";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";

export default function Rejestracja(){
    const {register} = useContext(GlobalContext);
    return (
        <div>
            <div className={'forma'}>

                <Formik
                    initialValues={{
                        login:"",
                        haslo: "",
                        powtorHasla: "",
                        email:""
                    }}
                    validationSchema={Yup.object({
                        login: Yup.string()
                            .min(6, "musi miec co najmniej 6 znaków")
                            .required("to pole jest wymagane"),
                        haslo: Yup.string()
                            .min(6, "musi miec co najmniej 6 znaków")
                            .required("to pole jest wymagane"),

                        powtorHasla: Yup.string()
                            .min(6, "musi miec co najmniej 6 znaków")
                            .oneOf([Yup.ref("haslo")], "musi zgadzać z haslem")
                            .required("to pole jest wymagane"),
                        email: Yup.string()
                            .email("email musi być poprawny")
                            .required("to pole jest wymagane"),

                    })}
                    onSubmit={(values, {resetForm}) => {

                        alert("SUBMIT");
                        console.log(values)
                        register(values)
                        // resetForm()
                        alert(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/register`)

                    }}

                >
                    {({dirty, isValid}) => (
                        <Form className={"formik"} autoComplete="off">

                           <p> Login</p>
                            <Field className={"pole_formy"}  type="text" name="login" placeholder="napisz login"
                            />
                            <ErrorMessage className={"error"} name="login" component="div"/>
                            <p>Email</p>
                            <Field className={"pole_formy"} type="email" name="email" placeholder="napisz email"
                            />
                            <ErrorMessage className={"error"} name="email" component="div"/>
                            {/*<br/>*/}
                            <p> Haslo</p>
                            <Field className={"pole_formy"}  type="password" name="haslo" placeholder="napisz haslo"
                            />
                            <ErrorMessage className={"error"}  name="haslo" component="div"/>
                            <p >Powtórz haslo</p>

                            <Field className={"pole_formy"}  type="password" name="powtorHasla"
                                   placeholder="powtórz haslo"
                            />
                            <ErrorMessage className={"error"} name="powtorHasla" component="div"/>
                            <br/>

                            <button type="submit" disabled={!isValid}
                                    onClick={(e)=>{
                                        // e.preventDefault()
                                    }}
                            >zarejestruj sie
                            </button>
                            <br/>
                            {JSON.stringify({ dirty, isValid })}
                        </Form>)}



                </Formik>
            </div>
        </div>
            )

            }