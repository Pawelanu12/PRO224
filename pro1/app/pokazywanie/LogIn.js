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
                    .required("Login jest wymagany"),
                password: Yup.string()
                    .required("Haslo jest wymagane"),


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

                    <Field type="text" name="login" placeholder="napisz login"
                    />
                    <ErrorMessage name="login" component="div"/>
                    <br/>
                    <Field type="text" name="password" placeholder="napisz haslo"
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