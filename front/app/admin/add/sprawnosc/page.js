'use client'

// import {ErrorMessage, Field, Form, Formik} from "formik";
// import * as Yup from "yup";
import {useContext, useRef, useState} from "react";
import PoleWDodawaniu from "@/app/functions/PoleWDodawaniu";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {AdminContext} from "@/app/providers/AdminProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import NavbarNiezarejestrowana from "@/app/navbars/NavbarNiezarejestrowana";

export default function AddSprawnosc(){
    const {addSprawnosci}=useContext(AdminContext)
    const [file,setFile]=useState(null)
    const onChange=(values)=>{
        console.log(values)
    }

    return (
        <div>
            <NavbarZarejestrowana/>

            <div className={"forma_dodawania"} style={{backgroundColor:"green",paddingTop:"50px"}}>
                <Formik

                   initialValues={{

                       nazwa:"",

                       opis: "",

                       opisWymagan: "",

                       typ:"bajkowe",
                       ikona:""
                   }}
                   validationSchema={Yup.object({
                       nazwa: Yup.string()
                           .required("to pole jest wymagane"),
                       opis: Yup.string()
                           .min(6, "musi miec co najmniej 6 znaków")
                           .required("to pole jest wymagane"),

                       opisWymagan: Yup.string()
                           .required("to pole jest wymagane"),
                       typ: Yup.string()
                           .required("to pole jest wymagane"),
                       // ikona:Yup.mixed()
                       //     .required("to pole jest wymagane"),
                           // .min(6, "musi miec co najmniej 6 znaków")
                           // .oneOf(["bajkowe","artystyczne"], "musi zgadzać z haslem")

                   })}
                   onSubmit={(values, {resetForm}) => {

                        console.log(file)
                       console.log(values)
                       const formData = new FormData();
                       formData.append("ikona", file);
                       formData.append("typ", values.typ);
                       formData.append("opis", values.opis);
                       formData.append("opisWymagan", values.opisWymagan);
                       formData.append("nazwa", values.nazwa);

                       addSprawnosci(formData)
                       // resetForm()
                   }}

               >
                   {({dirty, isValid,errors,touched,handleChange,values}) => (
                       <Form className={"formik"} encType="multipart/form-data">
                           <div className={"flexRow"}>
                              <div className={"dodaj-sprawnosci"}  >
                                  <p>nazwa</p>
                                   <Field
                                       // className={touched.nazwa?`form-control ${errors.nazwa}? invalid:valid`:`form-control`}
                                       className={"pole-formy-dodawnia"} type="text" name="nazwa" placeholder="napisz nazwe"
                                   />
                                   <ErrorMessage className={"error"} name="nazwa" component="div"/>
                                   <br/>
                                   <p> Typ sprawnosci</p>
                                   <Field
                                       // as="select"
                                       className={"pole-formy-dodawnia"} type="text" name="typ">
                                       {/*<option value="bajkowe" style={{color:"black"}}>Bajkowe</option>*/}
                                       {/*<option value="artystyczne" style={{color:"black"}}>Artystyczne</option>*/}
                                    </Field>
                                    <ErrorMessage className={"error"} name="typ" component="div"/>
                                    <br/>
                                  <p>Ikona sprawnosci</p>
                                   <label >Wyberz plik <input  type="file" accept="image/*" className={"pole-formy-dodawnia"}
                                          onChange={(e)=>
                                          {
                                              // handleChange(e)
                                              setFile(e.target.files[0])
                                             // console.log( URL.createObjectURL(e.target.files[0]))
                                             //  onChange(e.target.value)
                                          }}
                                                   style={{opacity:0}}
                                          name="ikona" placeholder="wstaw ikone"
                                    />
                                   </label>
                                    <ErrorMessage className={"error"}  name="ikona" component="div"/>
                              </div>
                               <div className={"dodaj-sprawnosci"}>
                                   <p> Opis dla użytkownika</p>
                                   <Field as="textarea"   className={"pole-formy-dodawnia"}  name="opis" placeholder="napisz opis"
                                   />
                                   <ErrorMessage className={"error"} name="opis" component="div"/>
                                   <p> opis dla admina</p>
                                   <Field as="textarea" className={"pole-formy-dodawnia"}  rows="4" cols="50" name="opisWymagan" placeholder="napisz opis wymagan"
                                   />
                                   <ErrorMessage className={"error"}  name="opisWymagan" component="div"/>
                               </div>

                           </div>
                               <button type="submit" disabled={!dirty || !isValid}
                               >dodaj sprawnosc
                               </button>
                       </Form>)}


               </Formik>
                <div>
                    {file&& <img src={URL.createObjectURL(file)} alt={file.name}/>}
                </div>
            </div>
        </div>
    )
}
// <PoleWDodawaniu nazwaPola={"typSprawnosci"} state={typSprawnosci} setState={setTypeSprawnosci}/>


