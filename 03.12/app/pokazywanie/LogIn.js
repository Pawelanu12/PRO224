'use client'

import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {v4} from "uuid";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function LogIn(){
    const {logIn}=useContext(GlobalContext)
       return(
        <Formik
            initialValues={{


                login:"",
                password:"",


            }}
            validationSchema={Yup.object({

                login: Yup.string()
                    .required("Opis jest wymagany"),
                password: Yup.string()
                    .required("Nazwa jest wymagany"),


            })}
            onSubmit={(values,{resetForm}) => {



                //console.log(values)
               if(logIn(values))
                   alert("logowanie udalo")
                else
                    alert("logowanie nie udalo")
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form>

                    <Field type="text" name="login" placeholder="napisz nazwe"
                    />
                    <ErrorMessage name="login" component="div"/>
                    <br/>
                    <Field type="text" name="password" placeholder="napisz nazwe"
                />
                    <ErrorMessage name="password" component="div"/>
                    <br/>
                    <button type="submit" disabled={!dirty || !isValid}
                    >Log In
                    </button>
                </Form>)}

        </Formik>
    )
}