'use client'

// import {ErrorMessage, Field, Form, Formik} from "formik";
// import * as Yup from "yup";
import {useRef, useState} from "react";
import PoleWDodawaniu from "@/app/functions/PoleWDodawaniu";

export default function AddSprawnosc(){
    const [typSprawnosci,setTypeSprawnosci]=useState("")

    return(
        <div >
            <PoleWDodawaniu nazwaPola={"typSprawnosci"} state={typSprawnosci} setState={setTypeSprawnosci}/>
        </div>
    )
}



{/*<Formik*/}
{/*    initialValues={{*/}
{/*        nazwa:"",*/}
{/*        opis: "",*/}
{/*        opisWymagan: "",*/}
{/*        typ:""*/}
{/*    }}*/}
{/*    validationSchema={Yup.object({*/}
{/*        nazwa: Yup.string()*/}
{/*            .required("to pole jest wymagane"),*/}
{/*        opis: Yup.string()*/}
{/*            .min(6, "musi miec co najmniej 6 znaków")*/}
{/*            .required("to pole jest wymagane"),*/}

{/*        opisWymagan: Yup.string()*/}
{/*            .required("to pole jest wymagane"),*/}
{/*        typ: Yup.string()*/}
{/*            .min(6, "musi miec co najmniej 6 znaków")*/}
{/*            .oneOf(["bajkowe","artystyczne"], "musi zgadzać z haslem")*/}
{/*            .required("to pole jest wymagane"),*/}

{/*    })}*/}
{/*    onSubmit={(values, {resetForm}) => {*/}


{/*        console.log(values)*/}
{/*        // register(values)*/}
{/*        // resetForm()*/}
{/*    }}*/}

{/*>*/}
{/*    {({dirty, isValid}) => (*/}
{/*        <Form className={"formik"}>*/}
{/*            <p>nazwa</p>*/}
{/*            <Field className={"pole_formy"} type="text" name="nazwa" placeholder="napisz nazwe"*/}
{/*            />*/}
{/*            <ErrorMessage className={"error"} name="nazwa" component="div"/>*/}
{/*            /!*<br/>*!/*/}

{/*            <Field as="select" className={"pole_formy"} type="typ" name="powtorHasla"*/}
{/*                   placeholder="powtórz haslo">*/}
{/*                <option value="bajkowe" >Bajkowe</option>*/}
{/*                <option value="artystyczne">Artystyczne</option>*/}
{/*            </Field>*/}
{/*            <ErrorMessage className={"error"} name="typ" component="div"/>*/}
{/*            <br/>*/}
{/*            <p> Opis dla użytkownika</p>*/}
{/*            <Field as="textarea"  className={"pole_formy"}  name="opis" placeholder="napisz opis"*/}
{/*            />*/}
{/*            <ErrorMessage className={"error"} name="opis" component="div"/>*/}
{/*            <p> opis dla admina</p>*/}
{/*            <Field as="textarea" className={"pole_formy"}  rows="4" cols="50" name="opisWymagan" placeholder="napisz opis wymagan"*/}
{/*            />*/}
{/*            <ErrorMessage className={"error"}  name="opisWymagan" component="div"/>*/}
{/*            <p >Typ sprawnosci</p>*/}


{/*                <button type="submit" disabled={!dirty || !isValid}*/}
{/*                >zarejestruj sie*/}
{/*                </button>*/}
{/*        </Form>)}*/}


{/*</Formik>*/}