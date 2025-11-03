'use client'

// import {ErrorMessage, Field, Form, Formik} from "formik";
// import * as Yup from "yup";
import {useContext, useRef, useState} from "react";
import PoleWDodawaniu from "@/app/functions/PoleWDodawaniu";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {AdminContext} from "@/app/providers/AdminProvider";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function AddWydarzenie(){
    const {addWydarzenie}=useContext(AdminContext)
    const {user}=useContext(GlobalContext)
    // const [file,setFile]=useState(null)

    return (
        <div>
            <NavbarZarejestrowana/>

            <div className={"forma_dodawania"} style={{backgroundColor: "green",paddingTop: "50px"}}>
                <Formik

                    initialValues={{

                        nazwa: "",
                        opis: "",
                        dataWyjazdu: "",
                        dataZakonczenia: "",
                        typ: "",
                        // ikona:""
                    }}
                    validationSchema={Yup.object({
                        nazwa: Yup.string()
                            .required("to pole jest wymagane"),
                        opis: Yup.string()
                            .min(6, "musi miec co najmniej 6 znaków")
                            .required("to pole jest wymagane"),

                        dataWyjazdu: Yup.date()
                            .required("to pole jest wymagane"),
                        dataZakonczenia: Yup.string()
                            .required("to pole jest wymagane")
                            .test('is-after', 'End date must be after start date', function (value) {
                                const {dataWyjazdu} = this.parent; // Access other fields in the schema
                                return value && dataWyjazdu && new Date(value) > new Date(dataWyjazdu);
                            }),
                        // ikona:Yup.mixed()
                        //     .required("to pole jest wymagane"),
                        // .min(6, "musi miec co najmniej 6 znaków")
                        // .oneOf(["bajkowe","artystyczne"], "musi zgadzać z haslem")

                    })}
                    onSubmit={(values, {resetForm}) => {

                        console.log(values)
                        addWydarzenie({...values,organizatorId:1})
                        resetForm()

                    }}

                >
                    {({dirty, isValid, errors, touched, handleChange, values}) => (
                        <Form className={"formik"} encType="multipart/form-data">
                            <div className={"flexRow"}>
                                <div className={"dodaj-sprawnosci"}>
                                    <p>nazwa</p>
                                    <Field
                                        // className={touched.nazwa?`form-control ${errors.nazwa}? invalid:valid`:`form-control`}
                                        className={"pole-formy-dodawnia"} type="text" name="nazwa"
                                        placeholder="napisz nazwe"
                                    />
                                    <ErrorMessage className={"error"} name="nazwa" component="div"/>
                                    <br/>
                                    {/*<p> Typ Wydarzenia</p>*/}
                                    {/*<Field*/}
                                    {/*    className={"pole-formy-dodawnia"} type="text" name="typ">*/}
                                    {/*</Field>*/}
                                    {/*<ErrorMessage className={"error"} name="typ" component="div"/>*/}
                                    <br/>
                                    {/*<p>Ikona sprawnosci</p>*/}
                                    {/*<label >Wyberz plik <input  type="file" accept="image/*" className={"pole-formy-dodawnia"}*/}
                                    {/*                            onChange={(e)=>*/}
                                    {/*                            {*/}
                                    {/*                                setFile(e.target.files[0])*/}
                                    {/*                            }}*/}
                                    {/*                            style={{opacity:0}}*/}
                                    {/*                            name="ikona" placeholder="wstaw ikone"*/}
                                    {/*/>*/}
                                    {/*</label>*/}
                                    {/*<ErrorMessage className={"error"}  name="ikona" component="div"/>*/}
                                </div>
                                <div className={"dodaj-sprawnosci"}>
                                    <p> Opis </p>
                                    <Field as="textarea" className={"pole-formy-dodawnia"} name="opis"
                                           placeholder="napisz opis"
                                    />
                                    <ErrorMessage className={"error"} name="opis" component="div"/>
                                    <p>Data wyjazdu </p>
                                    <Field type="datetime-local" className={"pole-formy-dodawnia"} name="dataWyjazdu"
                                           placeholder="napisz date wyjazdu"
                                    />
                                    <ErrorMessage className={"error"} name="dataWyjazdu" component="div"/>
                                    <p>Data wyjazdu </p>
                                    <Field type="datetime-local" className={"pole-formy-dodawnia"}
                                           name="dataZakonczenia"
                                           placeholder="napisz date zakonczenia"
                                    />
                                    <ErrorMessage className={"error"} name="dataZakonczenia" component="div"/>

                                </div>

                            </div>
                            <button type="submit" disabled={!dirty || !isValid}
                            >dodaj wydarzenie
                            </button>
                        </Form>)}


                </Formik>
            </div>
        </div>
            )
            }
            // <PoleWDodawaniu nazwaPola={"typSprawnosci"} state={typSprawnosci} setState={setTypeSprawnosci}/>


