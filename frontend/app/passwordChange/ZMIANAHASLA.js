'use client'

import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

export default function ZMIANAHASLA(){
    const {router} = useContext(GlobalContext);

    const wyslij=(haslo,email)=>{
        router.replace("/login");
    }
    return(
        <Formik
            initialValues={{
                haslo:"",
                powtorHasla:""
            }}
            validationSchema={Yup.object({

                haslo: Yup.string()
                    .min(6,"musi miec co najmniej 6 znaków")
                    .required("to pole jest wymagane"),

                powtorHasla: Yup.string()
                    .min(6,"musi miec co najmniej 6 znaków")
                    .oneOf([Yup.ref("haslo")],"musi zgadzać z haslem")
                    .required("to pole jest wymagane"),

            })}
            onSubmit={(values, {resetForm}) => {


                console.log(values)
                wyslij()
                resetForm()
            }}

        >
            {({dirty, isValid}) => (
                <Form className={"formik"}>
                    <Field style={{width:"230px"}} type="password" name="haslo" placeholder="napisz haslo"
                    />
                    <ErrorMessage name="haslo" component="div"/>
                    <Field style={{width:"230px",marginTop:"20px"}} type="password" name="powtorHasla" placeholder="powtórz haslo"
                />
                    <ErrorMessage name="powtorHasla" component="div"/>
                    <br/>

                    <button type="submit" disabled={!dirty || !isValid}
                    >wyślij kod
                    </button>
                    <br/>
                </Form>)}


        </Formik>

    )

}