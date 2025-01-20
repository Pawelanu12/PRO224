
'use client'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import {v4} from "uuid";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";


export default function EditProfileByAdmin() {
    const {editFromList,edit,onPokazywanieChange}=useContext(GlobalContext)
    const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex=/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return(
        <div>
           <button style={{color:'red'}}
                                                      onClick={()=>onPokazywanieChange({target:{value:"Users"}})}>
                Pówrót do userów
            </button>

        <Formik
            initialValues={{


                imie:edit.imie,
                nazwisko:edit.nazwisko,
                login: edit.login,
                email: edit.email,
                nrTelefonu:edit.nrTelefonu,
                rodzicId1:edit.rodzicId1,
                rodzicId2:edit.rodzicId2,
                typUzytkownikaId:edit.typUzytkownikaId,


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
                typUzytkownikaId:Yup.number().required("typUzytkownikaId jest wymagany").min(1,"Musi byc wiekszy od 0"),
            })}
            onSubmit={(values,{resetForm}) => {



                console.log(values)
                // const newValues={...values,id:1,
                //     dataUrodzenia:date,
                //     // dataDolaczeniaDoGromady:new Date(),
                //     haslo:null,
                //     nrTelefonu:"2132312",typUzytkownika:"Zuch"};
                // const
                const newValues={ ...values,
                    id:edit.id,
                };
                console.log(newValues)
                editFromList(newValues,"adminUser")
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
                    Numer telefonu
                    <Field type="text" name="nrTelefonu" placeholder="napisz date urodzenia"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="nrTelefonu" component="div"/>
                    <br/>
                    Rodzic1(jeżeli jesteś zuchem)
                    <Field type="number" name="rodzicId1" placeholder="napisz Rodzic2"
                    />
                    <br/>
                    Rodzic2(jeżeli jesteś zuchem)
                    <Field type="number" name="rodzicId2" placeholder="napisz Rodzic2"
                    />
                    <br/>
                    TypUzytkownikaId(1=Admin.2-Zuch,3-Rodzic,4-Przyboczny)
                    <Field type="number" name="typUzytkownikaId" placeholder="napisz typUzytkownikaId"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="typUzytkownikaId" component="div"/>
                    <br/>




                    <button style={{border:"1px solid black",backgroundColor:"white",padding:"10px"}} type="submit" disabled={!dirty || !isValid}
                    >Add
                    </button>
                </Form>)}

        </Formik>
        </div>
    )
}