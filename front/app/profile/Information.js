'use client'

import {useContext, useEffect, useRef, useState} from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import { SprawnoscContext } from "@/app/providers/AchievementProvider";
import {ErrorMessage, Field, Formik} from "formik";
import * as Yup from "yup";

export default function Information({uzytkownik}) {
    const { user, pushClick,editUser } = useContext(GlobalContext);
    const { zdobyteSprawnosci, getZdobyteSprawnosci,sprawnosci,getSprawnosci } = useContext(SprawnoscContext);
    const zdobyteId=zdobyteSprawnosci.map(z=>z.sprawnoscId)
    const [isEdit,setEdit] = useState(false);

    const [form,setForm]=useState({
        nrTelefonu:uzytkownik.nrTelefonu,
        dataUrodzenia:uzytkownik.dataUrodzenia,
        email:uzytkownik.email,
    })

    useEffect(() => {
        if(!uzytkownik)return
        getZdobyteSprawnosci(uzytkownik.id);
        getSprawnosci()
    }, [uzytkownik]);
    return (
        <div className="mt-5 flex flex-wrap bg-[#3A4F39] text-black">

            {/* LEWY */}
            <div className="flex-1 m-2.5 border-r border-black">

                <p className="font-semibold mb-2">Informacje</p>
                <div className="bg-[#D9D9D9] p-2 mr-2 relative">
                    {user.id===uzytkownik.id&&<button
                        onClick={() => {
                            if (isEdit) {
                                setForm({
                                    nrTelefonu: uzytkownik.nrTelefonu,
                                    dataUrodzenia: uzytkownik.dataUrodzenia,
                                    email: uzytkownik.email,
                                })
                            }
                            setEdit(!isEdit)
                        }
                        }
                        className="absolute right-2 top-2 text-lg text-blue-600 hover:underline"
                    >
                        {isEdit ? "Anuluj" : "Edytuj"}
                    </button>}
                    {!isEdit && <div>

                        <p className={"mt-0.5"}><span>numer telefonu: </span>
                            <span>{uzytkownik.nrTelefonu}</span></p>
                        <p><span>email: </span>
                            <span>{uzytkownik.email}</span></p>

                        <p className={"mt-0.5"}>
                            <span> data urodzenia: </span>
                            <span>{uzytkownik.dataUrodzenia}</span></p>
                    </div>}


                    {isEdit && user.id === uzytkownik.id && (
                        <Formik
                            initialValues={{
                                email: uzytkownik.email || "",
                                nrTelefonu: uzytkownik.nrTelefonu || "",
                                dataUrodzenia: uzytkownik.dataUrodzenia || "",
                            }}
                            enableReinitialize
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email("Niepoprawny email")
                                    .nullable()
                                    .notRequired(),
                                nrTelefonu: Yup.string()
                                    .matches(/^\d+$/, "Numer telefonu może zawierać tylko cyfry")
                                    .length(9, "numer musi zawierać 9 cyfr")
                                    .nullable()
                                    .notRequired(),
                            })}
                            onSubmit={(values) => {
                                // console.log(values)
                                editUser(uzytkownik.id, {...values})
                                setEdit(false)
                            }}
                        >
                            {({resetForm, isValid, handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    <p>
                                        numer telefonu:
                                        <Field
                                            name="nrTelefonu"
                                            type="text"
                                            className="border-1 rounded-sm block"
                                        />
                                        <ErrorMessage
                                            name="nrTelefonu"
                                            component="span"
                                            className="text-red-600 text-sm"
                                        />
                                    </p>
                                    <p>
                                        email:
                                        <Field
                                            name="email"
                                            type="text"
                                            className="border-1 rounded-sm block"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="text-red-600 text-sm"
                                        />
                                    </p>


                                    <p>
                                        data urodzenia:
                                        <Field
                                            name="dataUrodzenia"
                                            type="date"
                                            className="border-1 rounded-sm block"
                                        />

                                    </p>

                                    <div>
                                        <button disabled={!isValid}
                                                type="submit"
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-200"
                                        >
                                            Potwierdź
                                        </button>

                                        <button
                                            type="button"
                                            className="px-4 mx-2 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                            onClick={() => {
                                                resetForm();
                                                setEdit(false);
                                            }}
                                        >
                                            Anuluj
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    )}

                    <p className={"mt-0.5"}>typ: {uzytkownik.typUzytkownika}</p>
                    {user.nazwaSzostki && <p className={"mt-0.5"}>nazwa szóstki: {user.nazwaSzostki}</p>}
                    <p className={"mt-0.5"}>data dołączenia: {uzytkownik.dataDolaczenia}</p>
                </div>
            </div>

            {/* CENTRALNY */}
            <div className="flex-1 m-2.5 pr-2">
                <div className="flex flex-wrap justify-between bg-[#D9D9D9] p-2">
                    <p className="font-semibold">Zdobyte sprawności</p>
                    <button
                        onClick={(e) => pushClick(e, `/achievements/gained/${uzytkownik.id}`)}
                        className="bg-[#555353] text-white px-2 py-1 rounded"
                    >
                        Więcej
                    </button>
                </div>

                {zdobyteSprawnosci?.length > 0 && (
                    <div className="flex flex-wrap bg-[#D9D9D9] p-2 mt-2">
                        {sprawnosci.filter(s=>zdobyteId.includes(s.id)).map((s, i) => (
                            <div key={i} className="p-1 text-center">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}${s.ikonaUrl}`}
                                    alt={s.nazwa}
                                    className="max-w-[100px] max-h-[100px] object-fit"
                                />
                                <p>{s.nazwa}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
