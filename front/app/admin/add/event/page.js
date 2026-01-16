'use client'

import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AdminContext } from "@/app/providers/AdminProvider";
import { GlobalContext } from "@/app/providers/GlobalProvider";

export default function AddWydarzenie() {
    const { addWydarzenie } = useContext(AdminContext);
    const { user } = useContext(GlobalContext);
    const [files, setFiles] = useState([]);

    return (
        <div className=" pt-1 px-4">

            <Formik
                initialValues={{
                    nazwa: "",
                    opis: "",
                    dataWyjazdu: "",
                    dataZakonczenia: "",
                }}
                validationSchema={Yup.object({
                    nazwa: Yup.string().required("Wymagana nazwa"),
                    opis: Yup.string().min(6).required("Wymagany opis"),
                    dataWyjazdu: Yup.date().required(),
                    dataZakonczenia: Yup.date()
                        .required()
                        .test("is-after", "Data końca musi być po dacie wyjazdu", function (value) {
                            const { dataWyjazdu } = this.parent;
                            return value && dataWyjazdu && new Date(value) > new Date(dataWyjazdu);
                        }),
                })}
                onSubmit={(values) => {
                    const formData = new FormData();

                    files.forEach(f => formData.append("files", f));

                    formData.append("nazwa", values.nazwa);
                    formData.append("opis", values.opis);
                    formData.append("dataWyjazdu", values.dataWyjazdu);
                    formData.append("dataZakonczenia", values.dataZakonczenia);
                    formData.append("organizatorId", user.id);

                    addWydarzenie(formData);
                }}
            >
                {({ dirty, isValid }) => (
                    <Form>

                        <div className="flex flex-col md:flex-row gap-6">

                            {/* LEWA KOLUMNA – DANE */}
                            <div className="lg:w-[30%] bg-[#222822] p-6 rounded-xl text-white">

                                <h2 className="text-xl mb-4 text-center">Nowe wydarzenie</h2>

                                <label className="block mb-3">
                                    Nazwa
                                    <Field
                                        name="nazwa"
                                        className="w-full mt-1 p-2 rounded bg-[#1A1919]"
                                    />
                                    <ErrorMessage name="nazwa" component="div" className="text-red-400 text-sm" />
                                </label>

                                <label className="block mb-3">
                                    Opis
                                    <Field
                                        as="textarea"
                                        name="opis"
                                        className="w-full mt-1 p-2 rounded bg-[#1A1919] resize-none"
                                    />
                                    <ErrorMessage name="opis" component="div" className="text-red-400 text-sm" />
                                </label>

                                <label className="block mb-3">
                                    Data wyjazdu
                                    <Field
                                        type="datetime-local"
                                        name="dataWyjazdu"
                                        className="w-full mt-1 p-2 rounded bg-[#1A1919]"
                                    />
                                </label>

                                <label className="block mb-3">
                                    Data zakończenia
                                    <Field
                                        type="datetime-local"
                                        name="dataZakonczenia"
                                        className="w-full mt-1 p-2 rounded bg-[#1A1919]"
                                    />
                                </label>

                                <label className="block mb-4 cursor-pointer">
                                    Zdjęcia
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            setFiles(prev => [...prev, ...Array.from(e.target.files)])
                                        }
                                    />
                                    <div className="mt-2 p-2 bg-[#3A4F39] rounded text-center">
                                        Dodaj zdjęcia
                                    </div>
                                </label>

                                <button
                                    type="submit"
                                    disabled={!dirty || !isValid}
                                    className="w-full bg-green-600 py-2 rounded disabled:opacity-50"
                                >
                                    Dodaj wydarzenie
                                </button>
                            </div>

                            {/* PRAWA KOLUMNA – GALERIA */}
                            <div className="lg:w-[70%] bg-[#1A1919] p-6 rounded-xl text-white">
                                <h2 className="text-lg mb-4">Galeria zdjęć</h2>

                                {files.length === 0 && (
                                    <p className="text-gray-400">Brak dodanych zdjęć</p>
                                )}

                                <div className="flex flex-wrap gap-4">
                                    {files.map((file, i) => (
                                        <img
                                            key={i}
                                            src={URL.createObjectURL(file)}
                                            alt=""
                                            className="max-w-[180px] rounded-lg"
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
