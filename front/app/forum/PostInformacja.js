'use client'

import { useContext, useState } from "react";
import { GlobalContext } from "@/app/providers/GlobalProvider";
import Opcji from "@/app/forum/Opcji";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const compare_dates = (data_posta) => {
    const date1 = new Date(data_posta);
    const date2 = new Date();
    const millis = date2.getTime() - date1.getTime();
    const dni = (millis / (1000 * 60 * 60 * 24)) | 0;
    const godziny = (millis / (1000 * 60 * 60)) | 0;

    if (dni >= 1) return `${dni} dni temu`;
    if (dni === 0 && godziny > 0) return `${godziny} godzin temu`;
    return "mniej niż godzina temu";
};

export default function PostInformacja({ post }) {
    const { user } = useContext(GlobalContext);
    const [pelnyOpis, setPelnyOpis] = useState(false);
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);

    const images = post.zdjecia.map((z, i) => ({
        src: `${process.env.NEXT_PUBLIC_BACKEND_PORT}/uploads/posts/${z}`,
        alt: z,
        id: i,
    }));

    const next = () => setIndex((prev) => (prev + 1) % images.length);
    const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
if(!user)return <div>jesteś nie zalogowany</div>
    return (
        <div className="max-w-[500px] p-4 min-w-[250px]">
            {/* HEADER */}
            <div className="flex justify-between gap-4">
                <div className="flex flex-1 gap-3">
                    <img
                        src={post.ikona}
                        alt="ikona"
                        className="h-12 w-12 rounded-full object-cover"
                    />

                    <div>
                        <div className="flex items-center gap-3">
                            <p className="font-semibold">{post.autorLogin}</p>
                            {post.autorId !== user.id && (
                                <button className="text-sm text-[#88D79D] hover:underline">
                                    Obserwuj
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-gray-300">
                            {compare_dates(post.dataStworzenia)}
                        </p>
                    </div>
                </div>

                <div className="relative">
                    {show && <Opcji autor={post.autorLogin} post={post} />}
                    <button
                        onClick={() => setShow(!show)}
                        className="text-3xl text-gray-300 hover:text-white"
                    >
                        …
                    </button>
                </div>
            </div>

            {/* TREŚĆ */}
            <p
                className={`mt-3 ml-2 break-words ${
                    pelnyOpis
                        ? ""
                        : "line-clamp-3"
                }`}
            >
                {post.tresc}
            </p>

            <button
                onClick={() => setPelnyOpis(!pelnyOpis)}
                className="ml-2 mt-1 text-sm text-gray-400 hover:underline"
            >
                {pelnyOpis ? "pokaż mniej" : "pokaż więcej"}
            </button>

            {/* GALERIA */}
            {images.length > 0 && (
                <div className="relative mt-4 h-[300px] w-full overflow-hidden rounded-xl">
                    <img
                        src={images[index].src}
                        alt={images[index].alt}
                        className="h-full w-full object-contain"
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded bg-black/40 px-3 py-2 text-white"
                            >
                                ◀
                            </button>
                            <button
                                onClick={next}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-black/40 px-3 py-2 text-white"
                            >
                                ▶
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
