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
 /*tu wstaw id clienta*/
GOOGLE_CLIENT_ID=       
GOOGLE_CLIENT_SECRET=    /*tu wstaw secret clienta*/


5)wlączenie projektu
  w terminalu wpisać 
> npm run dev

  wejsc w przeglądarce na strone
  http://localhost:3000

---------------------------Backend------------------------------
1)plik appliction.properties

spring.application.name=Szyszka

#wstaw nazwę swojej bazy

spring.datasource.url=jdbc:mysql://localhost:3306/szyszkadb    

#wstaw username swojej bazy

spring.datasource.username=root

#wstaw password swojej bazy

spring.datasource.password=NoweHaslo123!                      

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

jwt.secret=u5s4QqVdW2rP2ZfLk7X8yM1dJ3nB5hK7t9oL6mR1pS4=

jwt.expiration-ms=3600000


spring.servlet.multipart.enabled=true

spring.servlet.multipart.max-file-size=10MB

spring.servlet.multipart.max-request-size=15MB

#wstaw id clienta Google

google.client-id:                                            


2)wlacznie applikacji
w folderze /PRO224/"pliki projektowe"/SZYSZKA

> ./mvnw spring-boot:run

lub za pomocą IntelIj wlączyć classe SzyszkaApplication


--------------------Baza Dannych------------
1)tworzenie bazy
stworz scheme i wstaw do niej dane z pliku 
createTableSQL (Final).txt

2)tworzenie drużynowego 
po tworzeniu użytkownika poprzez aplikacje wykonuj ten kod sql w bazie danych wstawiająć login użytkonwika zamiast napisu Twój login
UPDATE user
SET typ_uzytkownika = 'DRUZYNOWY'
WHERE login = 'Twój login';
