---------------------------POBRANIE REPO---------------------------

  w git bash lub cmd
>   git clone   https://github.com/Pawelanu12/PRO224.git
>   cd pro224

---------------------------FRONTEND---------------------------------------------------

krótka instrukcja pobierania i wlaczenia frontendu:
Pierwsze 4 kroki trzeba wykonać tylko przy instalacji projektu.
Pukt 5 trzeba wykonywać żeby wlączyć projekt za każdym razem
1)wejscie do plików frontendu

>   cd "pliki projektowe"
>   cd front

2)tworzenie projektu w webstorme (nie jest obowiązkowe jeżeli masz pobrany npm)
  otweranie webstorm
  
  File->New->Project

  w lewej czesci wybrać Next.js
  w Location wybrać path w którym znajduje się folder front z pobranego repositorium)
  interpreter i create-next-app domyslne(jeżeli puste to kliknąć na strzalke i wybrać pierwszy

  kliknąć create, a potem wybrać from existing sources


3)instalacja bibliotek 
  otworzyć terminal webstorma i wpisać
>   npm install

4)plik tajny .env.local
w pliku .env.local trzeba ustawić id clienta Google i jego klucz tajny
GOOGLE_CLIENT_ID=        /*tu wstaw id clienta*/
GOOGLE_CLIENT_SECRET=    /*tu wstaw secret clienta*/


5)wlączenie projektu
  w terminalu wpisać 
> npm run dev

  wejsc w przeglądarce na strone
  http://localhost:3000

---------------------------Backend------------------------------
