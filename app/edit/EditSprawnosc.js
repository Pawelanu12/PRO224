

'use client'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import {v4} from "uuid";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function EditSprawnosc(){
    const {editFromList,edit,zmienEdycje}=useContext(GlobalContext)


    return(
        <Formik
            initialValues={{

                nazwa:edit.nazwa,

                opis:edit.opis,
                opisWymagan:edit.opisWymagan



            }}
            validationSchema={Yup.object({

                opis: Yup.string()
                    .min(3, "Opis musi mieć co najmniej 3 znaki")
                    .max(2000, "Opis nie może być dłuższy niż 2000 znaków")
                    .required("Opis jest wymagany"),
                opisWymagan: Yup.string()
                    .min(3, "Opis musi mieć co najmniej 3 znaki")
                    .max(2000, "Opis nie może być dłuższy niż 2000 znaków")
                    .required("Opis jest wymagany"),
                nazwa: Yup.string()
                    .min(3, "Nazwa musi mieć co najmniej 3 znaki")
                    .max(30, "Nazwa nie może być dłuższy niż 30 znaków")
                    .required("Nazwa jest wymagany"),


            })}
            onSubmit={(values,{resetForm}) => {



                //console.log(values)
                const newValues={...values,id:edit.id};
                // console.log(newValues)
                editFromList(newValues,"Sprawnosc")
                setTimeout(()=>{zmienEdycje(null);resetForm()},10)

            }}

        >
            {({ dirty, isValid }) => (
                <Form style={{alignItems:"center",display:"flex",flexDirection:"column",
                    backgroundColor:"yellow",justifyContent:"center",border:"solid black 1px",margin:"10%"}}>

                    <Field type="text" name="nazwa" placeholder="napisz nazwe"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="nazwa" component="div"/>
                    <br/>
                    <Field type="text" name="opis" placeholder="napisz opis dla wszystcych"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="opis" component="div"/>
                    <br/>
                    <Field type="text" name="opisWymagan" placeholder="napisz opis dla adminow "
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="opisWymagan" component="div"/>
                    <br/>

                    <button type="submit" disabled={!dirty || !isValid}
                    >Edit
                    </button>
                </Form>)}

        </Formik>
    )
}
