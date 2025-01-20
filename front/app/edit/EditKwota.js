
'use client'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import {v4} from "uuid";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";



export default function EditKwota(){
    const {editFromList,edit}=useContext(GlobalContext)


    return(
        <Formik
            initialValues={{
                "kwota":edit.kwota,
                "nazwa":edit.nazwa,
                "dataWplaty":edit.dataWplaty,
            }}
            validationSchema={Yup.object({
                nazwa:Yup.string().required("Nazwa jes wymagana"),
                kwota: Yup.number()
                    .min(1, "Kwota nie może być mniejsza od 1")
                    .required("nie może byc pusta"),
                dataWplaty:Yup.date().required("data wplaty jest wymagane")
            })}
            onSubmit={(values,{resetForm}) => {



                const nowa={
                    ...values,
                    id:edit.id
                }
                editFromList(nowa,"Kwota")
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form style={{alignItems:"center",display:"flex",flexDirection:"column",
                    backgroundColor:"yellow",justifyContent:"center",border:"solid black 1px",margin:"10%"}}>
                    Nazwa:
                    <Field type="text" name="nazwa" placeholder="napisz nazwe"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="nazwa" component="div"/>
                    <br/>
                    Kwota:
                    <Field type="number" name="kwota" placeholder="napisz nazwe"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="kwota" component="div"/>
                    <br/>
                    data wplaty wplaty
                    <Field type="datetime-local" name="dataWplaty" placeholder="napisz nazwe"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="dataWplaty" component="div"/>
                    <br/>


                    <button type="submit" disabled={!dirty || !isValid}
                    >Edit
                    </button>
                </Form>)}

        </Formik>
    )
}