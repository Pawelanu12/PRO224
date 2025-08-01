'use client'

import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import NAVBARUNREGISTED from "@/app/navbars/NAVBARUNREGISTED";
// import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function LogIn(){
    const {replaceClick}=useContext(GlobalContext)

    return(
        <div style={{height:"100vh"}}>
            <NAVBARUNREGISTED/>
            <div style={{paddingTop:"50px",height:"100%"}}   className={"flexRow"}>
            <div style={{flex:"198",height:"100%",minWidth:"300px"}}>

            <Formik
                initialValues={{
                    login: "",
                    password: "",
                }}
                validationSchema={Yup.object({

                    login: Yup.string()
                        .required("Login jest wymagany"),
                    password: Yup.string()
                        .required("Haslo jest wymagane"),


                })}
                onSubmit={(values, {resetForm}) => {


                    console.log(values)
                    // logIn(values)
                    resetForm()
                }}

            >
                {({dirty, isValid}) => (
                    <Form style={{
                        alignItems: "center", display: "flex", flexDirection: "column",
                        backgroundColor: "#405E3F", justifyContent: "center",  margin: "10%"
                    }}>

                        <Field className={"field"} type="text" name="login" placeholder="napisz login"
                        />
                        <ErrorMessage name="login" component="div"/>
                        <br/>
                        <Field  className={"field"}  type="password" name="password" placeholder="napisz haslo"
                        />
                        <ErrorMessage name="password" component="div"/>
                        <br/>
                        <div style={{ display: "flex",
                            justifyContent: "space-between",
                            width: "80%",
                            marginTop: "10px"}}>
                            <button onClick={(e)=>replaceClick(e,"/rejestracja")} style={{color: "white", float: "left"}}>Zarejestruj sie</button>
                            <button onClick={(e)=>replaceClick(e,"/passwordChange")} style={{color: "white", float: "right"}}>nie pamiętasz hasla</button>
                        </div>
                        <br/>
                        <button style={{backgroundColor:"#354545",width:"80%"}} type="submit" disabled={!dirty || !isValid}
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