'use client'
import { useEffect, useRef, useState } from "react";

export default function Gromada() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselInner = useRef(null);

    const items = [
        { src: "/images/strona_glowna1.png", alt: "obraz 1", id: 1 },
        { src: "/images/strona_glowna2.png", alt: "obraz 2", id: 2 },
        { src: "/images/strona_glowna3.png", alt: "obraz 3", id: 3 },
        { src: "/images/strona_glowna3.png", alt: "obraz 4", id: 4 },
        { src: "/images/strona_glowna2.png", alt: "obraz 5", id: 5 },
        { src: "/images/strona_glowna1.png", alt: "obraz 6", id: 6 },
    ];

    const text = [
        { linia: "1. Gdyńska Gromada Zuchów „Rycerze z Kamiennej Góry” jest jednostką organizacyjną ZHR." },
        { linia: "Gromada działa od 11 października 2008 r. Należy do Gdyńskiego Hufca Harcerzy „Pasieka”." },
        { linia: "Do gromady należą zuchy w wieku od 7 do 11 lat." },
        { linia: "Każdego roku przyjmujemy nowych kandydatów na zuchów." },
        { linia: "Najstarszym proponujemy wstąpienie do drużyny harcerzy." },
        { linia: "Nasze zuchy trafiają do 36. Gdyńskiej Drużyny Harcerzy." },
        { linia: "Sąsiadem jest 3. Gdyńska Gromada Zuchów „Witomici”. (2025-02-28)" },
    ];

    useEffect(() => {
        const timeout = setTimeout(updateCarousel, 5000);
        return () => clearTimeout(timeout);
    }, [currentIndex]);

    function updateCarousel() {
        const offset = -((currentIndex + 1) % (items.length - 1)) * 50;
        setCurrentIndex(prev => prev + 1);
        if (carouselInner.current) {
            carouselInner.current.style.transform = `translateX(${offset}%)`;
        }
    }

    return (
        <div className="pt-[50px]">

            {/* CAROUSEL */}
            <div className="relative w-full overflow-hidden">
                <div
                    ref={carouselInner}
                    className="flex transition-transform duration-500 ease-in-out"
                >
                    {items.map(item => (
                        <img
                            key={item.id}
                            src={item.src}
                            alt={item.alt}
                            className="min-w-[50%] p-2 object-cover"
                        />
                    ))}
                </div>
            </div>

            {/* TEKST */}
            <div className="text-center mx-[5%] mt-6 p-5 bg-[#222822] text-lg text-white">
                <p className="text-2xl mb-4 bg-[#1A1919] py-2">O gromadzie</p>
                {text.map((l, i) => (
                    <p key={i} className="mb-2">
                        {l.linia}
                    </p>
                ))}
            </div>

        </div>
    );
}
