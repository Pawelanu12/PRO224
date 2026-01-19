'use client'

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import { signIn, useSession } from "next-auth/react";

export default function LogIn() {
    const { pushClick, logIn, googleLogin, user } = useContext(GlobalContext);
    const { data: session, status } = useSession();
    const sentRef = useRef(false);

    useEffect(() => {
        if (!user) return;
        pushClick(null, "/profile");
    }, [user]);

    useEffect(() => {
        if (status === "authenticated" && !sentRef.current) {
            if (!session?.googleIdToken) return;
            googleLogin(session.googleIdToken);
            sentRef.current = true;
        }
    }, [status, session]);

    return (
        <div className="min-h-screen ">
            <div className="flex h-full pt-[50px] flex-col md:flex-row">

                {/* LEFT – LOGIN */}
                <div className="flex-[2] min-w-[300px] flex justify-center items-center">
                    <Formik
                        initialValues={{ login: "", haslo: "" }}
                        validationSchema={Yup.object({
                            login: Yup.string().required("Login jest wymagany"),
                            haslo: Yup.string().required("Hasło jest wymagane"),
                        })}
                        onSubmit={(values, { resetForm }) => {
                            logIn(values);
                            resetForm();
                        }}
                    >
                        {({ dirty, isValid }) => (
                            <Form className="w-[80%] max-w-md rounded-xl bg-[#405E3F] p-8 shadow-lg flex flex-col gap-3">
                                <p className="text-white font-semibold">Login</p>
                                <Field
                                    name="login"
                                    className="rounded-md px-3 py-2 outline-none bg-white text-black"
                                    placeholder="napisz login"
                                />
                                <ErrorMessage name="login" component="div" className="text-red-400 text-sm"/>

                                <p className="text-white font-semibold mt-2">Hasło</p>
                                <Field
                                    type="password"
                                    name="haslo"
                                    className="rounded-md px-3 py-2 outline-none bg-white text-black"
                                    placeholder="napisz hasło"
                                />
                                <ErrorMessage name="haslo" component="div" className="text-red-400 text-sm"/>

                                <div className="flex justify-between text-sm text-gray-200 mt-2">
                                    <button
                                        type="button"
                                        onClick={(e) => pushClick(e, "/registration")}
                                        className="hover:underline"
                                    >
                                        Zarejestruj się
                                    </button>
                                    {/*<button*/}
                                    {/*    type="button"*/}
                                    {/*    onClick={(e) => pushClick(e, "/password-change")}*/}
                                    {/*    className="hover:underline"*/}
                                    {/*>*/}
                                    {/*    Nie pamiętasz hasła?*/}
                                    {/*</button>*/}
                                </div>

                                <button
                                    type="submit"
                                    disabled={!dirty || !isValid}
                                    className="mt-4 rounded-md bg-[#354545] py-2 text-white
                             {/*disabled:opacity-50 disabled:cursor-not-allowed*/}
                             hover:bg-[#2d3e3e]"
                                >
                                    Log In
                                </button>

                                <button
                                    type="button"
                                    onClick={() => signIn("google")}
                                    className="mt-2 rounded-md border border-white py-2 text-white
                             hover:bg-white hover:text-black transition"
                                >
                                    Sign in with Google
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>

                {/* SEPARATOR */}
                <div className="w-px bg-green-700 mx-2"/>

                {/* RIGHT – IMAGE */}
                <div className="flex-[2] m-5 rounded-2xl bg-[#405E3F]
                        flex flex-col justify-center items-center text-white">
                    <p className="mb-6 text-lg font-semibold">
                        1 Gdyńska gromada zuchów
                    </p>
                    <img
                        src="/images/login_page.png"
                        alt="login"
                        className="w-[80%] rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}
