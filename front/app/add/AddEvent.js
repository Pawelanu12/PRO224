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
    const {addDoListy,onPokazywanieChange,user}=useContext(GlobalContext)


    return(
        <Formik style={{justifyContent:"center"}}
            initialValues={{


                opis:"",
                 dataZakonczenia:"",
               dataWyjazdu:"",

                nazwa:""

            }}
            validationSchema={Yup.object({

                opis: Yup.string()
                    .min(3, "Opis musi mieć co najmniej 3 znaki")
                    .max(2000, "Opis nie może być dłuższy niż 2000 znaków")
                    .required("Opis jest wymagany"),
                nazwa: Yup.string()
                    .min(3, "Nazwa musi mieć co najmniej 3 znaki")
                    .max(30, "Nazwa nie może być dłuższy niż 30 znaków")
                    .required("Nazwa jest wymagany"),
                dataWyjazdu: Yup.date().required("Data rozpoczecia jest wymagana"),
                dataZakonczenia: Yup.date().required("Data zakonczenia jest wymagana")
                    .min(Yup.ref("dataWyjazdu"),"musi byc weksze od daty rozpoczecia")


            })}
            onSubmit={(values,{resetForm}) => {



              //console.log(values)
              //   values.startDate=(values.startDate.toString().slice(0,10)+" "+values.startDate.toString().slice(11,16))
              //   values.endDate =(values.endDate.toString().slice(0,10)+" "+values.endDate.toString().slice(11,16))
                const newValues={...values,uzytkownikId:user.id};
               console.log(newValues)
               addDoListy(newValues,"Event")

                setTimeout(()=>{resetForm();onPokazywanieChange({target:{value:"Events"}})},10)
            }}

        >
            {({ dirty, isValid }) => (
                <Form style={{alignItems:"center",display:"flex",flexDirection:"column",
                    backgroundColor:"yellow",justifyContent:"center",border:"solid black 1px",margin:"10%"}}>

                    <Field type="text" name="nazwa" placeholder="napisz nazwe"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="nazwa" component="div"/>
                    <br/>
                    Data rozpoczecia: <Field type="datetime-local" name="dataWyjazdu" placeholder="Data rozpoczecia"
                />
                    <ErrorMessage style={{backgroundColor:"red"}} name="dataWyjazdu" component="div"/>
                    <br/>

                    Data zakonczenia: <Field type="datetime-local" name="dataZakonczenia" placeholder="Data zakonczenia"
                />
                    <ErrorMessage style={{backgroundColor:"red"}} name="dataZakonczenia" component="div"/>
                    <br/>

                    <Field as="textarea" name="opis" placeholder="napisz opis" rows="12" cols="60"
                    />
                    <ErrorMessage style={{backgroundColor:"red"}} name="opis" component="div"/>
                    <br/>

                    <button type="submit" disabled={!dirty || !isValid}
                    >Add
                    </button>
                </Form>)}

        </Formik>
    )
}