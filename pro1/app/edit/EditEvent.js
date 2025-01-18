
'use client'
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {v4} from "uuid";

export default function EditEvent(){
    const {edit,zmienEdycje,editFromList}=useContext(GlobalContext)
    const  event=edit
    console.log(event.dataZakonczenia)
    const formatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    console.log(new Date().toLocaleDateString())
    const formattedDate = formatter.format(new Date(event.dataZakonczenia)).replace(", ","T");
    console.log(formattedDate);
    return(
        <Formik
            initialValues={{

                id:event.id,
                opis:event.opis,
                dataZakonczenia:new Date(event.dataZakonczenia).toLocaleDateString(),
                dataWyjazdu:new Date(event.dataWyjazdu).toLocaleDateString(),

                nazwa:event.nazwa
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


                console.log("cat")
                console.log(values)
                const newValues={...values,id:event.id};
                console.log(newValues)
                editFromList(newValues,"Event")
                setTimeout(()=>{zmienEdycje(null);resetForm()},10)


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
                    >Edit
                    </button>
                </Form>)}

        </Formik>

    )
}
