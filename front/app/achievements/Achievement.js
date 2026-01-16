'use client'

import { useContext, useState } from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";

export default function Achievement({ sprawnosc }) {
    const { setEdit, pushClick } = useContext(GlobalContext);
    const [show, setShow] = useState(false);
console.log(sprawnosc);
    return (
        <div>
            <div className={"hidden md:block"} onMouseMove={() => setShow(true)}
                 onMouseLeave={() => setShow(false)}>

                {/* KARTA SPRAWNOŚCI */}
                <div className="relative m-6">
                    <div

                        className="
                w-[150px]
                flex flex-col items-center
                rounded-lg
                cursor-pointer
                transition-colors duration-200
                hover:bg-[#3A3939]
              "
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}${sprawnosc.ikonaUrl}`}
                            alt="sprawnosc"
                            className="w-full h-[100px] rounded-lg object-contain"

                        />

                        <p
                            className="
                  mt-1
                  h-[50px]
                  w-full
                  text-center
                  text-sm
                  text-white
                  break-words
                  overflow-hidden
                "
                        >
                            {sprawnosc.nazwa}
                        </p>
                    </div>
                </div>

                {/* MODAL */}
                {show && (
                    <div
                        className={"absolute left-0 -mt-[185px] w-full z-50 flex items-center  justify-center items-center"}>
                        {/* BACKDROP */}
                        <div
                            className="absolute inset-0"
                            onClick={() => setShow(false)}
                        />

                        {/* OKNO */}
                        <div
                            className="
                  relative
                  w-[660px]
                  max-w-[90%]
                  rounded-xl
                  bg-[#DACA6F]
                  p-6
                  text-black
                  shadow-2xl
                "
                        >
                            {/* CLOSE */}
                            <button
                                onClick={() => setShow(false)}
                                className="absolute right-4 top-4 text-xl hover:text-red-600"
                            >
                                ✕
                            </button>
                            <button
                                onClick={(e) =>
                                    pushClick(e, `/achievements/${sprawnosc.id}`)}
                                className="absolute left-4 top-4 text-sm text-blue-600 hover:underline"
                            >
                                przejdz do osobnej strony
                            </button>

                            <h1 className="mb-4 text-center text-xl font-bold">
                                {sprawnosc.nazwa}
                            </h1>

                            <div className="text-lg whitespace-pre-wrap break-words">
                                {sprawnosc.opis}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/*widok mobilny*/}
            <div className={"md:hidden block"} onClick={(e) =>
                pushClick(e, `/achievements/${sprawnosc.id}`)}>

                {/* KARTA SPRAWNOŚCI */}
                    <div className="relative m-6">
                        <div
                            className="
                w-[150px]
                flex flex-col items-center
                rounded-lg
                cursor-pointer
                transition-colors duration-200
                hover:bg-[#3A3939]
              "
                        >
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}${sprawnosc.ikonaUrl}`}
                                alt="sprawnosc"
                                className="w-full h-[100px] rounded-lg object-contain"
                                // onClick={(e) => {
                                //     e.stopPropagation();
                                //     setEdit(sprawnosc);
                                //     pushClick(e, "/admin/edit/sprawnosc");
                                // }}
                            />

                            <p
                                className="
                  mt-1
                  h-[50px]
                  w-full
                  text-center
                  text-sm
                  text-white
                  break-words
                  overflow-hidden
                "
                            >
                                {sprawnosc.nazwa}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            );
            }
