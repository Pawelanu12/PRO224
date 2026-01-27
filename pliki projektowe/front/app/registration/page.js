'use client'

import { useContext } from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function Rejestracja() {
    const { register } = useContext(GlobalContext);

    return (
        <div className="min-h-[calc(100vh-50px)]  flex items-center justify-center ">
            <Formik
                initialValues={{
                    login: "",
                    haslo: "",
                    powtorHasla: "",
                    email: "",
                }}
                validationSchema={Yup.object({
                    login: Yup.string()
                        .min(6, "musi mieć co najmniej 6 znaków")
                        .required("to pole jest wymagane"),
                    haslo: Yup.string()
                        .min(6, "musi mieć co najmniej 6 znaków")
                        .required("to pole jest wymagane"),
                    powtorHasla: Yup.string()
                        .oneOf([Yup.ref("haslo")], "musi zgadzać się z hasłem")
                        .required("to pole jest wymagane"),
                    email: Yup.string()
                        .email("email musi być poprawny")
                        .required("to pole jest wymagane"),
                })}
                onSubmit={(values) => {
                    register(values);
                }}
            >
                {({ isValid }) => (
                    <Form
                        autoComplete="off"
                        className="w-[300px] rounded-xl bg-[#405E3F] p-4
                       flex flex-col items-center shadow-xl"
                    >
                        {/* LOGIN */}
                       <div><p className="text-white self-start mb-1">Login</p></div>
                        <Field
                            name="login"
                            placeholder="napisz login"
                            className="w-[230px] rounded-md px-3 py-2 mb-1 outline-none bg-white text-black"
                        />
                        <ErrorMessage
                            name="login"
                            component="div"
                            className="text-red-400 text-sm mb-2"
                        />

                        {/* EMAIL */}
                        <div><p className="text-white self-start mb-1">Email</p></div>
                        <Field
                            name="email"
                            type="email"
                            placeholder="napisz email"
                            className="w-[230px] rounded-md px-3 py-2 mb-1 outline-none bg-white text-black"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-400 text-sm mb-2"
                        />

                        {/* HASŁO */}
                        <div><p className="text-white self-start mb-1">Hasło</p></div>
                        <Field
                            name="haslo"
                            type="password"
                            placeholder="napisz hasło"
                            className="w-[230px] rounded-md px-3 py-2 mb-1 outline-none bg-white text-black"
                        />
                        <ErrorMessage
                            name="haslo"
                            component="div"
                            className="text-red-400 text-sm mb-2"
                        />

                        {/* POWTÓRZ HASŁO */}
                        <div><p className="text-white self-start mb-1">Powtórz hasło</p></div>
                        <Field
                            name="powtorHasla"
                            type="password"
                            placeholder="powtórz hasło"
                            className="w-[230px] rounded-md px-3 py-2 mb-1 outline-none bg-white text-black"
                        />
                        <ErrorMessage
                            name="powtorHasla"
                            component="div"
                            className="text-red-400 text-sm mb-4"
                        />

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="w-[230px] rounded-md bg-[#354545] py-2 text-white
                         hover:bg-[#2d3e3e]
                         disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Zarejestruj się
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
