
'use client'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import {v4} from "uuid";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";


//  nowy={(valu)=>{
//             //  console.log(valu)
//           var newWydatki=[...list,valu]
//               // console.log(newWydatki)
//               setList(newWydatki)
//           }}

//editowanie=-1?teraz nikt nie edituje wydatek:ktos edituje wydatek(zeby nie wyswetlalo

////expanse jezeli !==-1 to nie pokazuj nic bo ktos patrze na detali jakegos wydatku
export default function AddSprawnosc(){
    const {addDoListy}=useContext(GlobalContext)


    return(
        <Formik
            initialValues={{

                nazwa:"",

                opis:"",
                opisWymagan:""



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
               const newValues={...values,id:v4()};
                // console.log(newValues)
                addDoListy(newValues,"Sprawnosc")
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form>

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
                    >Add
                    </button>
                </Form>)}

        </Formik>
    )
}