'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

export default function POTWERDZENIEKODU(){
    const {setEtap} = useContext(GlobalContext);

    const wyslij=(kod)=>{
        setEtap("haslo");
    }
    return(
        <Formik
            initialValues={{
                kod:"",
            }}
            validationSchema={Yup.object({

                kod: Yup.number()
                    .min(100000,"musi być z scześciu cyfr")
                    .max(999999,"musi być z scześciu cyfr")
                    .required("kod jest wymagany"),


            })}
            onSubmit={(values, {resetForm}) => {


                console.log(values)
                wyslij()
                resetForm()
            }}

        >
            {({dirty, isValid}) => (
                <Form className={"formik"}>

                    <Field style={{width:"230px"}} type="number" name="kod" placeholder="wpisz kod"
                    />
                    <ErrorMessage name="kod" component="div"/>
                    <br/>

                    <button type="submit" disabled={!dirty || !isValid}
                    >zatwerdź kod
                    </button>
                    <br/>
                </Form>)}


        </Formik>

    )

}