
'use client'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import {v4} from "uuid";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";



export default function AddGlobalInformation(){
    const {addDoListy}=useContext(GlobalContext)


    return(
        <Formik
            initialValues={{


                opis:"",

            }}
            validationSchema={Yup.object({

                opis: Yup.string()
                    .min(3, "Opis musi mieć co najmniej 3 znaki")
                    .max(2000, "Opis nie może być dłuższy niż 2000 znaków")
                    .required("Opis jest wymagany"),


            })}
            onSubmit={(values,{resetForm}) => {



               const startDate=new Date()
                const dataInString =startDate.getDate()+"."+startDate.getMonth()
                    +"."+startDate.getFullYear()+" "+startDate.getHours()+"."+startDate.getMinutes()


                const newValues={...values,id:v4(),date:dataInString};
                 console.log(newValues)
                addDoListy(newValues,"GlobalInformation")
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form>

                        <Field as="textarea" name="opis"  placeholder="napisz opis" rows="12" cols="60"
                        />
                        <ErrorMessage name="opis" component="div"/>


                    <br/>

                    <button type="submit"   disabled={!dirty || !isValid}
                    >Add</button>
                </Form> )}

        </Formik>
    )
}