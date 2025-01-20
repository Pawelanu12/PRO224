
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
export default function AddKwota(){
    const {addDoListy,user}=useContext(GlobalContext)


    return(
        <Formik
            initialValues={{
                "kwota":0,
                "nazwa":"",
                "uzytkownikId":0
                }}
            validationSchema={Yup.object({
                nazwa:Yup.string().required("Nazwa jes wymagana"),
                kwota: Yup.number()
                    .min(1, "Kwota nie może być mniejsza od 1")
                    .required("nie może byc pusta"),
                uzytkownikId:Yup.number().required("idUsera jest wymagane").
                min(1,"id usera musi byc weksze od 0"),
            })}
            onSubmit={(values,{resetForm}) => {



               const nowa={
                   dataWplaty:new Date(),
                   ...values,
               }
                addDoListy(nowa,"Kwota")
                resetForm()
            }}

        >
            {({ dirty, isValid }) => (
                <Form style={{alignItems:"center",display:"flex",flexDirection:"column",
                    backgroundColor:"yellow",justifyContent:"center",border:"solid black 1px",margin:"10%"}}>
                    Nazwa:
                    <Field type="text" name="nazwa" placeholder="napisz nazwe"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="nazwa" component="div"/>
                    <br/>
                    Kwota:
                    <Field type="number" name="kwota" placeholder="napisz nazwe"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="kwota" component="div"/>
                    <br/>
                    Id usera do wplaty
                    <Field type="number" name="uzytkownikId" placeholder="napisz nazwe"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="uzytkownikId" component="div"/>
                    <br/>


                    <button type="submit" disabled={!dirty || !isValid}
                    >Add
                    </button>
                </Form>)}

        </Formik>
    )
}