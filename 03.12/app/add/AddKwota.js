
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
export default function AddEvent(){
    const {addDoListy,user}=useContext(GlobalContext)


    return(
        <Formik
            initialValues={{

                "kwota":0



            }}
            validationSchema={Yup.object({

                kwota: Yup.number()
                    .min(1, "Kwota nie może być mniejsza od 1")
                    .required("nie może byc pusta")




            })}
            onSubmit={(values,{resetForm}) => {



               const nowa={
                   date:new Date().toDateString(),
                   id:v4(),
                   ...values,
                   idUsera:user.id
               }
               // const newValues={...values,id:v4()};
                // console.log(newValues)
                addDoListy(nowa,"Kwota")
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form>

                    <Field type="number" name="kwota" placeholder="napisz nazwe"
                    />
                    <ErrorMessage name="kwota" component="div"/>
                    <br/>


                    <button type="submit" disabled={!dirty || !isValid}
                    >Add
                    </button>
                </Form>)}

        </Formik>
    )
}