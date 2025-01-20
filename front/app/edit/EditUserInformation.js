
'use client'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import {v4} from "uuid";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";


export default function EditUserInformation() {
    const {editFromList,edit}=useContext(GlobalContext)
    const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex=/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return(
        <Formik
            initialValues={{


                imie:edit.imie,
                nazwisko:edit.nazwisko,
                login: edit.login,
                email: edit.email,
                nrTelefonu:edit.nrTelefonu,
                // Rodzic1:0,
                // Rodzic2:0,
                //

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
                // haslo: Yup.string()
                //     .min(8, "Haslo musi mieć co najmniej 8 znaków")
                //     .max(30, "Haslo nie może być dłuższy niż 30 znaków")
                //     //   .matches(passwordRegex,{message:"musi miec co najmniej 1 upper case letter,1lower case letter i jeden number "})
                //     .required("Haslo jest wymagany"),
                email:Yup.string()
                    .required("nie moze byc pusty")

                    .matches(emailRegex,{message:"email musi byc poprawny"}),
                nrTelefonu:Yup.string().required("NrTelefonu jest wymagany"),
                // Rodzic1:Yup.number(),
                // Rodzic2:Yup.number(),



            })}
            onSubmit={(values,{resetForm}) => {



                console.log(values)
                const date=new Date(values.dataUrodzenia)
                console.log(date)
                // const newValues={...values,id:1,
                //     dataUrodzenia:date,
                //     // dataDolaczeniaDoGromady:new Date(),
                //     haslo:null,
                //     nrTelefonu:"2132312",typUzytkownika:"Zuch"};
                const newValues={ ...values,id:edit.id};
                console.log(newValues)
                editFromList(newValues,"normalUser")
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form style={{alignItems:"center",display:"flex",flexDirection:"column",
                    backgroundColor:"yellow",justifyContent:"center",border:"solid black 1px",margin:"10%"}}>
                    Name
                    <Field  type="text" name="imie" placeholder="napisz imie"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="imie" component="div"/>
                    <br/>
                    Surname
                    <Field type="text" name="nazwisko" placeholder="napisz nazwisko"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="nazwisko" component="div"/>
                    <br/>
                    Login
                    <Field type="text" name="login" placeholder="napisz login"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="login" component="div"/>
                    <br/>
                    {/*Password*/}
                    {/*<Field type="password" name="haslo" placeholder="napisz haslo"*/}
                    {/*/>*/}
                    {/*<ErrorMessage style={{backgroundColor:"red"}} name="haslo" component="div"/>*/}
                    {/*<br/>*/}

                    Email
                    <Field type="text" name="email" placeholder="napisz email"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="email" component="div"/>
                    <br/>

                    Date of birth
                    <Field type="Date" name="dataUrodzenia" placeholder="napisz date urodzenia"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="dataUrodzenia" component="div"/>
                    <br/>
                    Numer telefonu
                    <Field type="text" name="nrTelefonu" placeholder="napisz date urodzenia"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="nrTelefonu" component="div"/>
                    <br/>
                    {/*Rodzic1(jeżeli jesteś zuchem)*/}
                    {/*<Field type="number" name="Rodzic1" placeholder="napisz date urodzenia"*/}
                    {/*/>*/}
                    {/*<ErrorMessage style={{backgroundColor:"red"}} name="nrTelefonu" component="div"/>*/}
                    {/*<br/>*/}
                    {/*Rodzic2(jeżeli jesteś zuchem)*/}
                    {/*<Field type="text" name="Rodzic2" placeholder="napisz date urodzenia"*/}
                    {/*/>*/}
                    {/*<ErrorMessage style={{backgroundColor:"red"}} name="Rodzic2" component="div"/>*/}
                    {/*<br/>*/}




                    <button style={{border:"1px solid black",backgroundColor:"white",padding:"10px"}} type="submit" disabled={!dirty || !isValid}
                    >Add
                    </button>
                </Form>)}

        </Formik>
    )
}