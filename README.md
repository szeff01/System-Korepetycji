
# Testowanie i Jakość Oprogramowania

## Autor
Przemysław Szewczyk

## Temat projektu
System zarządzania rezerwacjami dla korepetycji.

## Opis projektu
Projekt umożliwia użytkownikom:
- Rejestrację i logowanie do systemu.
- Przegląd dostępnych korepetytorów wraz z ich szczegółami.
- Dodawanie nowych korepetytorów.
- Rezerwację dostępnych terminów u korepetytorów.
- Wyszukiwanie korepetytorów po kategorii

# Instrukcja Uruchomienia projektu

## Uruchomienie backendu

1. Przejdź do folderu backend:
   ```bash
   cd backend
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom server backendu:
   ```bash
   npm start
   ```

## Uruchomienie frontendu

1. Przejdź do folderu frontend:
   ```bash
   cd frontend
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom frontend:
   ```bash
   npm run dev
   ```

## Testy

## Testy jednostkowe i integracyjne

Projekt zawiera 20 testów, które obejmują kluczowe funkcjonalności komponentów Login, Register oraz AddTeacher.
Testy zostały napisane z wykorzystaniem Jest i React Testing Library.
Lista testów

    Login
        - Renderowanie formularza logowania.
        - Przycisk submit wyłączony przy pustych polach.
        - Przycisk submit aktywuje się po wprowadzeniu danych.
        - Formularz nie pozwala na wysyłkę przy pustych polach.
        - Wysłanie formularza z poprawnymi danymi.
        - Czyszczenie pól formularza po udanym logowaniu.
        - Wyświetlanie błędu logowania przy niepoprawnych danych.
        - Obsługa błędu sieci i wyświetlanie ogólnego komunikatu.

    Register
        - Renderowanie formularza rejestracji.
        - Aktualizacja wartości pól formularza.
        - Wysłanie formularza z danymi i wywołanie fetch.
        - Weryfikacja poprawności żądania wysyłanego na serwer.
        - Obsługa pozytywnej odpowiedzi serwera.

    AddTeacher
        - Dodanie nowej kategorii do listy.
        - Renderowanie formularza z polami wejściowymi.
        - Aktualizacja wartości pól formularza.
        - Weryfikacja obecności przycisku „Dodaj Korepetytora”.
        - Walidacja dla pustego pola Imię.
        - Blokowanie wysyłki formularza z niepoprawnymi danymi.
        - Obsługa walidacji dla listy kategorii.

## Przypadki testowe dla testera manualnego (TestCase)

**TC001: Dodawanie nowego korepetytora**  
**Warunki początkowe:** Użytkownik znajduje się na stronie "Dodaj Korepetytora".  
**Kroki testowe:**  
    1. Wypełnij pole Imię wartością Anna.  
    2. Wypełnij pole Opis wartością Korepetytorka języka angielskiego z 5-letnim doświadczeniem.  
    3. Wpisz Ocena jako 4.8.  
    4. Wpisz Liczba opinii jako 12.  
    5. Wpisz Lokalizacja jako Warszawa.  
    6. Dodaj URL zdjęcia jako (https://ibb.co/vZw9zL4).  
    7. Wybierz kategorię Angielski i kliknij Dodaj.  
    8. Wybierz dzień Poniedziałek, ustaw godziny 10:00 - 14:00, i kliknij Dodaj.  
    9. Kliknij przycisk Dodaj Korepetytora.  
**Oczekiwany rezultat:** Pojawia się komunikat *Korepetytor został dodany*.  

**TC002: Dodanie korepetytora bez obowiązkowego pola**  
**Warunki początkowe:** Użytkownik znajduje się na stronie "Dodaj Korepetytora".  
**Kroki testowe:**  
    1. Pozostaw pole Imię puste.  
    2. Wypełnij wszystkie pozostałe pola poprawnymi danymi.  
    3. Kliknij Dodaj Korepetytora.  
**Oczekiwany rezultat:** Formularz nie zostaje przesłany, a użytkownik widzi komunikat o brakującym polu *Proszę wypełnić to pole*.  

**TC003: Logowanie użytkownika z poprawnymi danymi**  
**Warunki początkowe:** Użytkownik znajduje się na stronie Logowanie.  
**Kroki testowe:**  
    1. Wpisz adres e-mail *test@example.com*.  
    2. Wpisz hasło *Test1234*.  
    3. Kliknij przycisk Zaloguj się.  
**Oczekiwany rezultat:** Użytkownik zostaje przeniesiony na stronę *Home*.  

**TC004: Logowanie użytkownika z niepoprawnymi danymi**  
**Warunki początkowe:** Użytkownik znajduje się na stronie Logowanie.  
**Kroki testowe:**  
    1. Wpisz adres e-mail *niepoprawny@example.com*.  
    2. Wpisz hasło *BłędneHasło*.  
    3. Kliknij przycisk Zaloguj się.  
**Oczekiwany rezultat:** Pojawia się komunikat *Błąd logowania „No records found”*.  

**TC005: Rejestracja nowego użytkownika**  
**Warunki początkowe:** Użytkownik znajduje się na stronie Rejestracja.  
**Kroki testowe:**  
    1. Wpisz Imię jako *Jan*.  
    2. Wpisz Email jako *jan@example.com*.  
    3. Wpisz Hasło jako *JanTest123*.  
    4. Kliknij przycisk Zarejestruj się.  
**Oczekiwany rezultat:** Pojawia się komunikat *Success*.  

**TC006: Przeglądanie szczegółów korepetytora**  
**Warunki początkowe:** Na stronie głównej jest dostępny korepetytor.  
**Kroki testowe:**  
    1. Kliknij profil korepetytora *Patryk*.  
**Oczekiwany rezultat:** Wyświetlane są szczegółowe informacje o korepetytorze, takie jak ocena, opis i harmonogram dostępności.  

**TC007: Rezerwacja terminu korepetycji**  
**Warunki początkowe:** Użytkownik przegląda szczegóły korepetytora z dostępnym harmonogramem.  
**Kroki testowe:**  
    1. Wybierz datę *Poniedziałek*.  
    2. Wybierz godzinę *10:00*.  
    3. Kliknij przycisk Zarezerwuj.  
**Oczekiwany rezultat:** Wyświetlany jest komunikat *Rezerwacja powiodła się*.  

**TC008: Wyszukiwarka korepetytora po przedmiocie**  
**Warunki początkowe:** Użytkownik znajduje się na stronie głównej.  
**Kroki testowe:**  
    1. Kliknij na pole Wyszukiwarka.  
    2. Wpisz frazę *historia*.  
    3. Kliknij przycisk Szukaj.  
**Oczekiwany rezultat:** Na stronie wyświetla się lista korepetytorów, którzy oferują zajęcia z przedmiotu *Historia* (np. korepetytor o imieniu *Patryk*).  

**TC009: Powrót do poprzedniej strony**  
**Warunki początkowe:** Użytkownik znajduje się na stronie szczegółów korepetytora.  
**Kroki testowe:**  
    1. Kliknij przycisk *Cofnij*.  
**Oczekiwany rezultat:** Użytkownik wraca do poprzedniej strony.  

**TC010: Przeglądanie listy korepetytorów**  
**Warunki początkowe:** Użytkownik znajduje się na stronie głównej.  
**Kroki testowe:**  
    1. Sprawdź, czy lista zawiera przynajmniej jednego korepetytora (np. Patryk).  
**Oczekiwany rezultat:** Na stronie widoczna jest lista z dostępnymi korepetytorami, wraz z oceną i lokalizacją.  

## Technologie użyte w projekcie

    Frontend:
        - ReactJS
        - React Router
        

    Backend:
        - Node.js
        - Express.js

    Inne:
        - React Testing Library
        - Jest
        - REST API
        - Fetch API