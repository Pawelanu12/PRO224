'use client'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import {v4} from "uuid";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";



export default function AddUserAchivement(){
    const {addDoListy,user,achivementUserId}=useContext(GlobalContext)


    return(
        <Formik
            initialValues={{
                sprawnoscId:0,
            }}
            validationSchema={Yup.object({

                sprawnoscId: Yup.number()
                    .min(1, "sprawnoscId nie może być mniejsza od 1")
                    .required("nie może byc pusta")

            })}
            onSubmit={(values,{resetForm}) => {

                const newUserAchivement={
                    date:new Date().toISOString(),
                    ...values,
                    userId:achivementUserId,
                }
                // const newValues={...values,id:v4()};
                // console.log(newValues)
                addDoListy(newUserAchivement,"newUserAchivement")
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form style={{alignItems:"center",display:"flex",flexDirection:"column",
                    backgroundColor:"yellow",justifyContent:"center",border:"solid black 1px",margin:"10%"}}>
SprawnoscId:
                    <Field type="number" name="sprawnoscId" placeholder="napisz id sprawnosci"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="sprawnoscId" component="div"/>
                    <br/>


                    <button type="submit" disabled={!dirty || !isValid}
                    >Add
                    </button>
                </Form>)}

        </Formik>
    )
}