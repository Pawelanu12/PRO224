'use client'

import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useContext, useState} from "react";
import  {PasswordChangeContext} from "@/app/providers/PasswordChangeProvider";

export default function WYSYLANIEKODU(){
    const {setEtap,setEmail,setKod} = useContext(PasswordChangeContext);

    const wyslij=(email)=>{
        //wysylanie i eneracja kodu do email
        setEmail(email);
        setKod(123456)
        setEtap("kod");
    }
    return(
        <Formik
            initialValues={{
                email:"",
            }}
            validationSchema={Yup.object({

                email: Yup.string()
                    .email("musi być email")
                    .required("email jest wymagany"),


            })}
            onSubmit={(values, {resetForm}) => {


                console.log(values)
                wyslij()
                resetForm()
            }}

        >
            {({dirty, isValid}) => (
                <Form className={"formik"}>

                    <Field style={{width:"230px"}} type="email" name="email" placeholder="napisz email"
                    />
                    <ErrorMessage name="email" component="div"/>
                    <br/>

                    <button type="submit" disabled={!dirty || !isValid}
                    >wyślij kod
                    </button>
                    <br/>
                </Form>)}


        </Formik>

    )
}