krótka instrukcja pobierania i wlaczenia frontendu:
Pierwsze 3 kroki trzeba wykonać tylko przy instalacji projektu.
Pukt 4 trzeba wykonywać żeby wlączyć projekt za każdym razem
1)pobranie proektu
  w git bash lub cmd
>   git clone   https://github.com/Pawelanu12/PRO224.git
   
>   cd pro224
   
>   git checkout s27297
2)tworzenie projektu w webstorme
  otweranie webstorm
  
  File->New->Project

  w lewej czesci wybrać Next.js
  w Location wybrać path w którym znajduje się folder front z pobranego repositorium)
  interpreter i create-next-app domyslne(jeżeli puste to kliknąć na strzalke i wybrać pierwszy

  kliknąć create, a potem wybrać from existing sources

3)instalacja bibliotek
  otworzyć terminal webstorma i wpisać
>   npm install
                                   
4)wlączenie projektu
  w terminalu wpisać 
> npm run dev

  wejsc w przeglądarce na strone
  http://localhost:3000
