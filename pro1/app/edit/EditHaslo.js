'use client'


import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {v4} from "uuid";
import {useEffect, useRef} from "react";

export default function EditHaslo({id}){
    const noweHasl=useRef(123)
    useEffect(() => {
        console.log(noweHasl.current.value)
    }, [noweHasl.current.value])


return<div></div>
    // return(
    //     <Formik
    //         initialValues={{
    //
    //
    //
    //             haslo: "",
    //             noweHaslo:"",
    //
    //
    //
    //         }}
    //         validationSchema={Yup.object({
    //
    //
    //             haslo: Yup.string()
    //                 .min(8, "Haslo musi mieć co najmniej 8 znaków")
    //                 .max(30, "Haslo nie może być dłuższy niż 30 znaków"),
    //             noweHaslo:Yup.string()
    //             .min(8, "Haslo musi mieć co najmniej 8 znaków")
    //             .max(30, "Haslo nie może być dłuższy niż 30 znaków"),
    //             // powtorHasla:Yup.string()
    //             // .min(8, "Haslo musi mieć co najmniej 8 znaków")
    //             // .max(30, "Haslo nie może być dłuższy niż 30 znaków")
    //             //     .equals(String(noweHasl.current.value))
    //
    //         })}
    //         onSubmit={(values,{resetForm}) => {
    //
    //
    //
    //             console.log(values)
    //
    //             resetForm()
    //         }}
    //
    //     >
    //         {({ dirty, isValid }) => (
    //             <Form>
    //
    //
    //                 <Field type="password" name="haslo" placeholder="napisz haslo"
    //                 />
    //                 <ErrorMessage name="haslo" component="div"/>
    //                 <br/>
    //                 <Field type="password" name="noweHaslo" placeholder="napisz haslo"
    //                 />
    //                 <ErrorMessage name="noweHaslo" component="div"/>
    //                 <br/>
    //                 {/*<Field type="password" name="powtorHasla" placeholder="napisz haslo"*/}
    //                 {/*/>*/}
    //                 {/*<ErrorMessage name="powtorHasla" component="div"/>*/}
    //                 {/*<br/>*/}
    //
    //                 <button type="submit" disabled={!dirty || !isValid}
    //                 >Add
    //                 </button>
    //             </Form>)}
    //
    //     </Formik>
    // )
}