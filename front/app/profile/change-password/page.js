'use client'

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {useContext} from "react";
import {GlobalContext} from "@/app/providers/GlobalProvider";

export default function ChangePassword() {
    const {changePassword}=useContext(GlobalContext);
    return (
        <div className="min-h-[calc(100vh-50px)] flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl shadow-md p-6 bg-[#3A4F39]">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Zmiana hasła
                </h2>

                <Formik
                    initialValues={{
                        oldPassword:"",
                        newPassword: "",
                        powtorHasla: "",
                    }}
                    validationSchema={Yup.object({
                        newPassword: Yup.string()
                            .min(6, "Musi mieć co najmniej 6 znaków")
                            .required("To pole jest wymagane"),

                        powtorHasla: Yup.string()
                            .oneOf([Yup.ref("newPassword")], "Hasła muszą być takie same")
                            .required("To pole jest wymagane"),
                        // oldPassword: Yup.string()
                        //     .required("To pole jest wymagane"),
                    })}
                    onSubmit={(values, { resetForm }) => {
                        changePassword(values)
                        resetForm();
                    }}
                >
                    {({ dirty, isValid }) => (
                        <Form className="space-y-4">
                            <div>
                                <Field
                                    type="password"
                                    name="oldPassword"
                                    placeholder="Stare hasło"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <ErrorMessage
                                    name="oldPassword"
                                    component="div"
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>

                            <div>
                                <Field
                                    type="password"
                                    name="newPassword"
                                    placeholder="Nowe hasło"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <ErrorMessage
                                    name="newPassword"
                                    component="div"
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>

                            <div>
                                <Field
                                    type="password"
                                    name="powtorHasla"
                                    placeholder="Powtórz hasło"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <ErrorMessage
                                    name="powtorHasla"
                                    component="div"
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!dirty || !isValid}
                                className="w-full py-2 bg-green-700 text-white rounded-md font-medium
                           hover:bg-green-800 disabled:bg-green-400 disabled:cursor-not-allowed
                           transition-colors"
                            >
                                Zmień hasło
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
