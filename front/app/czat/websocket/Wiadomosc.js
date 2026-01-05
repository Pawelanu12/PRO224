'use client'

export default function Wiadomosc({ wiadomosc, wiadomosc2 }) {
    const showHeader =
        !wiadomosc2 || wiadomosc2.nadawca !== wiadomosc.nadawca;

    return (
        <div className="flex gap-3 px-4 py-1">

            {/* AVATAR */}
            {showHeader ? (
                <img
                    src={wiadomosc.avatar || "/images/ikona.png"}
                    alt="avatar"
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
            ) : (
                <div className="w-10 shrink-0" />
            )}

            {/* CONTENT */}
            <div className="flex min-w-0 flex-col">

                {showHeader && (
                    <div className="mb-1 flex items-center gap-2 text-sm w-full">
            <span className="font-semibold line-clamp-1">
              {wiadomosc.nadawca}
            </span>
            <span className="text-xs text-gray-400">
              {wiadomosc.dataWyslania}
            </span>
                    </div>
                )}

                {/* MESSAGE BUBBLE */}
                <div className="
          {/*max-w-[75%]*/}
          rounded-2xl
          bg-gray-700
          px-3 py-2
          text-sm text-white
          whitespace-pre-wrap
          break-all
          overflow-hidden
        ">
                    {wiadomosc.tresc}
                </div>

            </div>
        </div>
    );
}
