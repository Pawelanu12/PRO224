
'use client'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import {v4} from "uuid";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";


export default function AddUser(){
    const {addDoListy}=useContext(GlobalContext)
    const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex=/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return(
        <Formik
            initialValues={{


                imie:"",
                nazwisko:"",

                login: "",
                haslo: "",
                email: "",
                dataUrodzenia:"",

            }}
            validationSchema={Yup.object({

                imie: Yup.string()
                    .min(3, "Opis musi mieć co najmniej 3 znaki")
                    .max(2000, "Opis nie może być dłuższy niż 2000 znaków")
                    .required("Opis jest wymagany"),
                nazwisko: Yup.string()
                    .min(3, "Nazwisko musi mieć co najmniej 3 znaki")
                    .max(30, "Bazwisko nie może być dłuższy niż 30 znaków")
                    .required("Nazwisko jest wymagany"),
                login: Yup.string()
                    .min(3, "Login musi mieć co najmniej 3 znaki")
                    .max(30, "Login nie może być dłuższy niż 30 znaków")
                    .required("Login jest wymagany"),
                haslo: Yup.string()
                    .min(8, "Haslo musi mieć co najmniej 8 znaków")
                    .max(30, "Haslo nie może być dłuższy niż 30 znaków")
                //   .matches(passwordRegex,{message:"musi miec co najmniej 1 upper case letter,1lower case letter i jeden number "})
                    .required("Haslo jest wymagany"),
                email:Yup.string()
                    .required("nie moze byc pusty")

                    .matches(emailRegex,{message:"email musi byc poprawny"}),
                dataUrodzenia: Yup.date().required("Data urodzenia jest wymagana")



            })}
            onSubmit={(values,{resetForm}) => {



                console.log(values)
                 const newValues={...values,id:v4(),dataDolaczeniaDoGromady:new Date()};
               console.log(newValues)
                addDoListy(newValues,"User")
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form>

                    <Field type="text" name="imie" placeholder="napisz imie"
                    />
                    <ErrorMessage name="imie" component="div"/>
                    <br/>

                    <Field type="text" name="nazwisko" placeholder="napisz nazwisko"
                    />
                    <ErrorMessage name="nazwisko" component="div"/>
                    <br/>

                    <Field type="text" name="login" placeholder="napisz login"
                    />
                    <ErrorMessage name="login" component="div"/>
                    <br/>

                    <Field type="password" name="haslo" placeholder="napisz haslo"
                    />
                    <ErrorMessage name="haslo" component="div"/>
                    <br/>


                    <Field type="text" name="email" placeholder="napisz email"
                    />
                    <ErrorMessage name="email" component="div"/>
                    <br/>


                    <Field type="Date" name="dataUrodzenia" placeholder="napisz date urodzenia"
                    />
                    <ErrorMessage name="dataUrodzenia" component="div"/>
                    <br/>



                    <button type="submit" disabled={!dirty || !isValid}
                    >Add
                    </button>
                </Form>)}

        </Formik>
    )
}