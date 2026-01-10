'use client'

// import {ErrorMessage, Field, Form, Formik} from "formik";
// import * as Yup from "yup";
import {useContext, useRef, useState} from "react";
import PoleWDodawaniu from "@/app/functions/PoleWDodawaniu";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {AdminContext} from "@/app/providers/AdminProvider";
import NavbarNiezarejestrowana from "@/app/navbar/NavbarNiezarejestrowana";
import NavbarZarejestrowana from "@/app/navbar/NavbarZarejestrowana";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {FaX} from "react-icons/fa6";

export default function EditWydarzenie(){
    const {editWydarzenie,deleteWydarzenie}=useContext(AdminContext)
    const {edit}=useContext(GlobalContext)
    const [zdjeciaDoUsuniecia,setZdjeciaDoUsuniecia] = useState([])
    const [files,setFiles]=useState([])
    console.log(edit.zdjecia)
    return (
        <div>

            <div className={"forma_dodawania"} style={{backgroundColor: "green", paddingTop: "50px"}}>
                <Formik

                    initialValues={{

                        nazwa: edit.nazwa,
                        opis: edit.opis,
                        dataWyjazdu: edit.dataWyjazdu,
                        dataZakonczenia: edit.dataZakonczenia,
                        typ: edit.typ
                    }}
                    validationSchema={Yup.object({
                        nazwa: Yup.string()
                            .required("to pole jest wymagane"),
                        opis: Yup.string()
                            .min(6, "musi miec co najmniej 6 znaków")
                            .required("to pole jest wymagane"),

                        dataWyjazdu: Yup.date()
                            .required("to pole jest wymagane"),
                        dataZakonczenia: Yup.string()
                            .required("to pole jest wymagane")
                            .test('is-after', 'End date must be after start date', function (value) {
                                const {dataWyjazdu} = this.parent; // Access other fields in the schema
                                return value && dataWyjazdu && new Date(value) > new Date(dataWyjazdu);
                            }),
                        // ikona:Yup.mixed()
                        //     .required("to pole jest wymagane"),
                        // .min(6, "musi miec co najmniej 6 znaków")
                        // .oneOf(["bajkowe","artystyczne"], "musi zgadzać z haslem")

                    })}
                    onSubmit={(values, {resetForm}) => {
                        console.log(files)
                        console.log(values)
                        const formData = new FormData();
                        if (files) {
                            for (let i = 0; i < files.length; i++) {
                                formData.append("noweZdjecia", files[i]);
                            }
                        }
                        if (zdjeciaDoUsuniecia) {
                            for (let i = 0; i < zdjeciaDoUsuniecia.length; i++) {
                                formData.append("zdjeciaDoUsuniecia", zdjeciaDoUsuniecia[i]);
                            }
                        }

                        formData.append("nazwa", values.nazwa);
                        formData.append("opis", values.opis);
                        formData.append("dataWyjazdu", values.dataWyjazdu);
                        formData.append("dataZakonczenia", values.dataZakonczenia);

                        editWydarzenie(edit.id,formData)
                        resetForm()

                    }}

                >
                    {({dirty, isValid, errors, touched, handleChange, values}) => (
                        <Form className={"formik"} encType="multipart/form-data">
                            <div className={"flexRow"}>
                                <div className={"dodaj-sprawnosci"}>
                                    <p>nazwa</p>
                                    <Field
                                        // className={touched.nazwa?`form-control ${errors.nazwa}? invalid:valid`:`form-control`}
                                        className={"pole-formy-dodawnia"} type="text" name="nazwa"
                                        placeholder="napisz nazwe"
                                    />
                                    <ErrorMessage className={"error"} name="nazwa" component="div"/>
                                    <br/>
                                    {/*<p> Typ Wydarzenia</p>*/}
                                    {/*<Field*/}
                                    {/*    className={"pole-formy-dodawnia"} type="text" name="typ">*/}
                                    {/*</Field>*/}
                                    {/*<ErrorMessage className={"error"} name="typ" component="div"/>*/}
                                    <br/>
                                    Files
                                    <label>Wyberz plik <input type="file" accept="image/*" multiple={true}
                                                              className={"pole-formy-dodawnia"}
                                                              onChange={(e) => {
                                                                  // handleChange(e)
                                                                  setFiles(prev => [...prev, ...Array.from(e.target.files)]);
                                                                  console.log(e.target.files)
                                                                  // console.log( URL.createObjectURL(e.target.files[0]))
                                                                  //  onChange(e.target.value)
                                                              }}
                                                              style={{opacity: 0}}
                                                              name="ikona" placeholder="wstaw ikone"
                                    />
                                    </label>
                                    <ErrorMessage className={"error"} name="ikona" component="div"/>
                                </div>
                                <div className={"dodaj-sprawnosci"}>
                                    <p> Opis </p>
                                    <Field as="textarea" className={"pole-formy-dodawnia"} name="opis"
                                           placeholder="napisz opis"
                                    />
                                    <ErrorMessage className={"error"} name="opis" component="div"/>
                                    <p>Data wyjazdu </p>
                                    <Field type="datetime-local" className={"pole-formy-dodawnia"} name="dataWyjazdu"
                                           placeholder="napisz date wyjazdu"
                                    />
                                    <ErrorMessage className={"error"} name="dataWyjazdu" component="div"/>
                                    <p>Data wyjazdu </p>
                                    <Field type="datetime-local" className={"pole-formy-dodawnia"}
                                           name="dataZakonczenia"
                                           placeholder="napisz date zakonczenia"
                                    />
                                    <ErrorMessage className={"error"} name="dataZakonczenia" component="div"/>

                                </div>

                            </div>
                            <button type="submit" disabled={ !isValid}
                            >edit wydarzenie
                            </button>
                        </Form>)}


                </Formik>
            </div>
            <div
                style={{display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap"}}>
                {edit.zdjecia && edit.zdjecia.length > 0 && edit.zdjecia.filter(file=>!zdjeciaDoUsuniecia.includes(file))
                    .map((file, i) => (
                    <div style={{
                        margin: "10px", width: "200px",
                        display: "flex", flexDirection: "row"
                    }} key={i}>

                        <img key={i} style={{}}
                             src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/uploads/wydarzenia/${file}`} alt={file}/>
                        <button style={{
                            backgroundColor: "grey",
                            padding: "10px",
                            marginTop: "10px",
                            borderRadius: "30px",
                            // width:"36px",
                            height:"36px",
                            marginLeft:"-40px"
                        }}
                            onClick={() => {
                                console.log(file);
                            setZdjeciaDoUsuniecia(prev=>[...prev,file])
                                                           }}
                        >
                            <FaX/>
                        </button>
                    </div>

                ))}</div>
            <div
                style={{display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap"}}>
                {files && files.length > 0 && files.map((file, i) => (
                    <div style={{margin: "10px", width: "200px",display:"flex",flexDirection:"row"}} key={i}>
                        <img key={i} src={URL.createObjectURL(file)} alt={file.name}/>
                        <button style={{
                            backgroundColor: "grey",
                            padding: "10px",
                            marginTop: "10px",
                            borderRadius: "30px",
                            // width:"36px",
                            height: "36px",
                            marginLeft: "-40px"
                        }}
                                onClick={() => {
                                    console.log(file);
                                    setFiles(prev => prev.filter((f,index)=>i!==index))
                                }}
                        >
                            <FaX/>
                        </button>
                    </div>
                ))}</div>

        </div>
    )
}
// <PoleWDodawaniu nazwaPola={"typSprawnosci"} state={typSprawnosci} setState={setTypeSprawnosci}/>


