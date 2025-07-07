'use client'

import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";
// import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function LogIn(){
    const {}=useContext(GlobalContext)

    return(
        <div style={{height:"100vh"}}>
            <NAVBARUNREGISTED/>
            <div   className={"flexRow"}>
            <div style={{flex:"198",height:"100%"}}>

            <Formik
                initialValues={{


                    login: "",
                    password: "",


                }}
                validationSchema={Yup.object({

                    login: Yup.string()
                        .required("Login jest wymagany"),
                    password: Yup.string()
                        .required("Haslo jest wymagane"),


                })}
                onSubmit={(values, {resetForm}) => {


                    console.log(values)
                    // logIn(values)
                    resetForm()
                }}

            >
                {({dirty, isValid}) => (
                    <Form style={{
                        alignItems: "center", display: "flex", flexDirection: "column",
                        backgroundColor: "#405E3F", justifyContent: "center",  margin: "10%"
                    }}>

                        <Field className={"field"} type="text" name="login" placeholder="napisz login"
                        />
                        <ErrorMessage name="login" component="div"/>
                        <br/>
                        <Field  className={"field"}  type="password" name="password" placeholder="napisz haslo"
                        />
                        <ErrorMessage name="password" component="div"/>
                        <br/>
                        <button type="submit" disabled={!dirty || !isValid}
                        >Log In
                        </button>
                        <br/>
                    </Form>)}


            </Formik>
        </div>
                <div className={"vl"} style={{flex: 1,height:"100%"}}>

                </div>
            <div style={{flex: 198}}></div>
            </div>
        </div>
    )


}