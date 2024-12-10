'use client'
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {v4} from "uuid";

export default function EditEvent({event}){
    const {edit}=useContext(GlobalContext)


    return(
        <Formik
            initialValues={{


                opis:event.opis,
                endDate:event.endDate,
                startDate:event.startDate,

                nazwa:event.nazwa

            }}
            validationSchema={Yup.object({

                opis: Yup.string()
                    .min(3, "Opis musi mieć co najmniej 3 znaki")
                    .max(2000, "Opis nie może być dłuższy niż 2000 znaków")
                    .required("Opis jest wymagany"),
                nazwa: Yup.string()
                    .min(3, "Nazwa musi mieć co najmniej 3 znaki")
                    .max(30, "Nazwa nie może być dłuższy niż 30 znaków")
                    .required("Nazwa jest wymagany"),
                startDate: Yup.date().required("Data rozpoczecia jest wymagana"),
                endDate: Yup.date().required("Data zakonczenia jest wymagana")
                    .min(Yup.ref("startDate"),"musi byc weksze od daty rozpoczecia")


            })}
            onSubmit={(values,{resetForm}) => {



                //console.log(values)
                values.startDate=(values.startDate.toString().slice(0,10)+" "+values.startDate.toString().slice(11,16))
                values.endDate =(values.endDate.toString().slice(0,10)+" "+values.endDate.toString().slice(11,16))
                const newValues={...values,id:event.id};
                console.log(newValues)
                //addDoListy(newValues,"Event")
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form>

                    <Field type="text" name="nazwa" placeholder="napisz nazwe"
                    />
                    <ErrorMessage name="nazwa" component="div"/>
                    <br/>
                    Data rozpoczecia: <Field type="datetime-local" name="startDate" placeholder="Data rozpoczecia"
                />
                    <ErrorMessage name="startDate" component="div"/>
                    <br/>

                    Data zakonczenia: <Field type="datetime-local" name="endDate" placeholder="Data zakonczenia"
                />
                    <ErrorMessage name="endDate" component="div"/>
                    <br/>

                    <Field as="textarea" name="opis" placeholder="napisz opis" rows="12" cols="60"
                    />
                    <ErrorMessage name="opis" component="div"/>
                    <br/>

                    <button type="submit" disabled={!dirty || !isValid}
                    >Add
                    </button>
                </Form>)}

        </Formik>
    )
}