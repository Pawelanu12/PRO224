'use client'

import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";
// import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function LogIn(){
    const {replaceClick,logIn}=useContext(GlobalContext)

    return(
        <div style={{height:"100vh"}}>
            <NavbarNiezarejestrowana/>
            <div style={{paddingTop:"50px",height:"100%"}}   className={"flexRow"}>
            <div style={{flex:"198",height:"100%",minWidth:"300px"}}>

            <Formik
                initialValues={{
                    login: "",
                    haslo: "",
                }}
                validationSchema={Yup.object({

                    login: Yup.string()
                        .required("Login jest wymagany"),
                    haslo: Yup.string()
                        .required("Haslo jest wymagane"),


                })}
                onSubmit={(values, {resetForm}) => {


                    console.log(values)
                    logIn(values)
                    resetForm()
                }}

            >
                {({dirty, isValid}) => (
                    <Form style={{
                        alignItems: "center", display: "flex", flexDirection: "column",
                        backgroundColor: "#405E3F", justifyContent: "center", margin: "10%"
                    }}>
                        <p>Login</p>
                        <Field className={"field"} type="text" name="login" placeholder="napisz login"
                        />
                        <ErrorMessage name="login" component="div"/>
                        <br/>
                        <p>Haslo</p>
                        <Field className={"field"} type="password" name="haslo" placeholder="napisz haslo"
                        />
                        <ErrorMessage name="haslo" component="div"/>
                        <br/>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "80%",
                            marginTop: "10px"
                        }}>
                            <p onClick={(e) => replaceClick(e, "/rejestracja")}
                               className={"zarejestruj"}>Zarejestruj sie
                            </p>
                            <p onClick={(e) => replaceClick(e, "/password-change")}
                                    className={"nie_pamietasz_haslo"}>nie pamiętasz hasla
                            </p>
                        </div>
                        <br/>
                        <button style={{backgroundColor: "#354545", width: "80%"}} type="submit"
                                disabled={!dirty || !isValid}
                        >Log In
                        </button>
                        <br/>
                    </Form>)}


            </Formik>
            </div>
                <div style={{flex: 1,height:"100%",borderLeft:"solid green 1px"}}>

                </div>

            <div style={{flex: 198, borderRadius: "5%",
                backgroundColor:"#405E3F",
                height:"90%",display:"flex",margin:"20px", flexDirection:"column",
                justifyContent:"center",textAlign:"center"}}>
                <p style={{paddingBottom:"10%"}}>1 Gdyńska gromada zuchów</p>
                <img style={{width:"100%",paddingLeft:"10%",paddingRight:"10%",}} src={"/images/login_page.png"} alt={"image"}/>
            </div>
            </div>
        </div>
    )


}