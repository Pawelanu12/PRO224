'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {PasswordChangeContext} from "@/app/providers/PasswordChangeProvider";
import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";

export default function ZMIANAHASLA(){
    const {router} = useContext(GlobalContext);
    const rejestracja=(value)=> {
        //await fetch("https://localhost:8080/createuser", {
        //                         method: "POST",
        //                         body: JSON.stringify([value.email,value.value.haslo]),
        //                         headers: {"Content-Type": "application/json"}
        //                     }).then(alert("haslo zmienione"))
        //                     .router.replace("login)
        //                     .catch(err=>alert(err))
        router.replace("/login");
    }
    return (
        <div>
                <NAVBARUNREGISTED/>
            <div className={'forma'}>

                <Formik
                    initialValues={{
                        login:"",
                        haslo: "",
                        powtorHasla: ""
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

                    })}
                    onSubmit={(values, {resetForm}) => {


                        console.log(values)
                        rejestracja(values)
                        resetForm()
                    }}

                >
                    {({dirty, isValid}) => (
                        <Form className={"formik"}>
                            <Field style={{width: "230px"}} type="text" name="login" placeholder="napisz login"
                            />
                            <ErrorMessage name="login" component="div"/>

                            <Field style={{width: "230px",marginTop: "20px"}} type="password" name="haslo" placeholder="napisz haslo"
                            />
                            <ErrorMessage name="haslo" component="div"/>
                            <Field style={{width: "230px", marginTop: "20px"}} type="password" name="powtorHasla"
                                   placeholder="powtórz haslo"
                            />
                            <ErrorMessage name="powtorHasla" component="div"/>
                            <br/>

                            <button type="submit" disabled={!dirty || !isValid}
                            >zarejestruj sie
                            </button>
                            <br/>
                        </Form>)}


                </Formik>
            </div>
        </div>
            )

            }