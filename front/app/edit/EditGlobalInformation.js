

'use client'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import {v4} from "uuid";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";



export default function EditGlobalInformation(){
    const {edit,zmienEdycje,editFromList}=useContext(GlobalContext)
    // const globalInfo=edit


    return(
        <Formik
            initialValues={{


                opis:edit.opis,

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
                    +"."+startDate.getFullYear()+" "+startDate.getHours()+"."+startDate.getMinutes()+"."+startDate.getSeconds()


                const newValues={...values,id:edit.id,date:dataInString};
                console.log(newValues)
                editFromList(newValues,"GlobalInformation")
                zmienEdycje(null)
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form style={{alignItems:"center",display:"flex",flexDirection:"column",
                    backgroundColor:"yellow",justifyContent:"center",border:"solid black 1px",margin:"10%"}}>
                    Opis
                    <Field as="textarea" name="opis"  placeholder="napisz opis" rows="12" cols="60"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="opis" component="div"/>


                    <br/>

                    <button type="submit"   disabled={!dirty || !isValid}
                    >Edit</button>
                </Form> )}

        </Formik>
    )
}
