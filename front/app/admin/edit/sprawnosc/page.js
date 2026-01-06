'use client'

// import {ErrorMessage, Field, Form, Formik} from "formik";
// import * as Yup from "yup";
import {useContext, useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {AdminContext} from "@/app/providers/AdminProvider";
import NavbarZarejestrowana from "@/app/navbars/NavbarZarejestrowana";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import DeleteDialog from "@/app/functions/DeleteDialog";
async function fileFromUrl(url, fileName) {
    if (typeof url !== 'string' || !url.trim()) {
        throw new Error("Invalid URL provided.");
    }
    if (typeof fileName !== 'string' || !fileName.trim()) {
        throw new Error("Invalid file name provided.");
    }

    try {
        const response = await fetch(url, { mode: 'cors' }); // CORS must be allowed by server
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        // Create a File object from the Blob
        return new File([blob], fileName, { type: blob.type || "application/octet-stream" });
    } catch (error) {
        console.error("Error creating File from URL:", error);
        throw error;
    }
}
export default function EditSprawnosc(){
    const {editSprawnosci,deleteSprawnosci}=useContext(AdminContext)
    const {edit,setEdit,pushClick}=useContext(GlobalContext)
    const [file,setFile]=useState(null)
    const imgRef=useRef(null)

    useEffect(() => {
        if(!edit||!edit.id)
            pushClick("","/sprawnosci")
    }, []);
    useEffect(() => {
        const getImage=async ()=>{
            if(edit.ikonaUrl){
                const fileObject = await fetch(process.env.NEXT_PUBLIC_BACKEND_PORT + "" + edit.ikonaUrl)
                    .then(response => response.blob())
                    .then(blob =>{const file= new File([blob],
                        'filename.txt', { type: blob.type })
                        setFile(file)
                        // console.log(imgRef.current.files)
                    })
                    ;
    }}
        if(edit&&edit.ikonaUrl) getImage()
    }, []);
    return (
        <div>

            <div className={"forma_dodawania"} style={{backgroundColor:"green",paddingTop:"50px"}}>
               <DeleteDialog id={edit.id} funkcjaDoUsunecia={deleteSprawnosci}/>
                <Formik

                    initialValues={{

                        nazwa:edit.nazwa||"",

                        opis: edit.opis||"",

                        opisWymagan: edit.opisWymagan||"",

                        typ:edit.typ||"",
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

                    })}
                    onSubmit={(values, {resetForm}) => {
                    if(file){
                        console.log(file)
                        console.log(values)
                        const formData = new FormData();
                        formData.append("ikona", file);
                        formData.append("typ", values.typ);
                        formData.append("opis", values.opis);
                        formData.append("opisWymagan", values.opisWymagan);
                        formData.append("nazwa", values.nazwa);

                         editSprawnosci(edit.id,formData)
                        setEdit({});
                        resetForm()
                        }
                    else alert("dodaj file")
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
                                    <label >Wyberz plik <input ref={imgRef}  type="file" accept="image/*" className={"pole-formy-dodawnia"}
                                                                onChange={(e)=>
                                                                {
                                                                    // handleChange(e)
                                                                    console.log(e.target.files.length)
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
                            >edituj sprawnosc
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


