
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
export default function AddGlobalInformation(){
    const {setGlobalInfo,globalInfo}=useContext(GlobalContext)


    return(
        <Formik
            initialValues={{


                opis:"",

            }}
            validationSchema={Yup.object({

                opis: Yup.string()
                    .min(3, "Opis musi mieć co najmniej 3 znaki")
                    .max(2000, "Opis nie może być dłuższy niż 2000 znaków")
                    .required("Opis jest wymagany"),


            })}
            onSubmit={(values,{resetForm}) => {



               const startDate=new Date()
                const dataInString =startDate.getDate()+"."+startDate.getMonth()
                    +"."+startDate.getFullYear()+" "+startDate.getHours()+"."+startDate.getMinutes()


                const newValues={...values,id:v4(),date:dataInString};
                 console.log(newValues)
                setGlobalInfo([...globalInfo,newValues])
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form>

                        <Field as="textarea" name="opis"  placeholder="napisz opis" rows="12" cols="60"
                        />
                        <ErrorMessage name="opis" component="div"/>


                    <br/>

                    <button type="submit"   disabled={!dirty || !isValid}
                    >Add</button>
                </Form> )}

        </Formik>
    )
}