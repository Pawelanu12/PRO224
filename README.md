***POBRANIE REPO***

  W git bash lub cmd
>   git clone   https://github.com/Pawelanu12/PRO224.git

>   cd pro224



***Baza Dannych***

*1. Tworzenie bazy*

  W MySQL Workbench
  stworz nową scheme i wstaw do niej dane z pliku - "createTableSQL (Final).txt"

***Backend***

*1. Plik appliction.properties*

  ścieżka \Szyszka\src\main\resources\application.properties
  należy wpisać nazwę lokalnej bazy danych, datasource.username oraz hasło. 
  uzupełnić google.client-id
```
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
```

*2. Uruchomienie applikacji*

  w folderze /PRO224/"pliki projektowe"/SZYSZKA
  
  > ./mvnw spring-boot:run
  
  lub za pomocą IntelIj uruchomić SzyszkaApplication

***FRONTEND***

krótka instrukcja pobierania i włączenia frontendu:
Pierwsze 3 kroki trzeba wykonać tylko przy instalacji projektu.
Punkt 4 trzeba wykonywać żeby uruchomić projekt za każdym razem


*1. Tworzenie projektu w webstorme (nie jest obowiązkowe jeżeli masz pobrany npm)*

  otwieranie webstorm
  
  File->New->Project

  po lewej stronie należy wybrać Next.js
  w Location wybrać path w którym znajduje się folder front z pobranego repositorium)
  interpreter i create-next-app domyslne(jeżeli puste to kliknąć na strzalke i wybrać pierwszy

  kliknąć create, a potem wybrać from existing sources


*2. Instalacja bibliotek*

  otworzyć terminal webstorma i wpisać
>   npm install

*3. Plik tajny .env.local*

  w pliku .env.local trzeba ustawić id clienta Google i jego klucz tajny
```
NEXT_PUBLIC_BACKEND_PORT2='http://192.168.1.240:8080'
NEXT_PUBLIC_BACKEND_PORT='http://localhost:8080'
BACKEND_PORT='http://localhost:8080'

NEXTAUTH_SECRET=secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=            /*wstaw tutaj Google client id */
GOOGLE_CLIENT_SECRET=        /*wstaw tutaj Google client secret */
```

*4. Uruchomienie projektu*
  w terminalu wpisać 
> npm run dev

  w przeglądarce wejść na strone: http://localhost:3000  
  
  


***Nadawanie stworzonemu użytkownikowi uprawnień drużynowego***  

*1. Zarejestruj użytkownika w aplikacji.*

  Wybierz "Zarejestruj się" i wypełnij formularz. Opcjonalnie skorzystaj z logowania przez Google.

*2. Nadawanie uprawnień* 

  W MySQL Workbench pod paskiem nawigacyjnym wybrać "Create new SQL tab for executing queries"
  wykonaj poniższe zapytanie SQL aby zmienić typ utworzonego użytkownika na Drużynowego aby miał wszystkie uprawnienia, wstawiająć login użytkownika zamiast   napisu Twój login

```
UPDATE user
SET typ_uzytkownika = 'DRUZYNOWY'
WHERE login = 'Twój login';
```

