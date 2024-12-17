import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddTeacher from "./AddTeacher";

//Test sprawdza, czy formularz w komponencie AddTeacher renderuje wszystkie wymagane pola i umożliwia wprowadzenie danych. Wartości wpisane do pól formularza są weryfikowane, aby upewnić się, że są poprawnie zapisane.
describe("Komponent AddTeacher", () => {
  test("renderuje formularz i pozwala na wprowadzenie danych", () => {
    render(
      <MemoryRouter>
        <AddTeacher />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Imię:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Opis:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ocena:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Liczba opinii:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Lokalizacja:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/URL zdjęcia:/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Imię:/i), { target: { value: "Jan Kowalski" } });
    fireEvent.change(screen.getByLabelText(/Opis:/i), { target: { value: "Świetny nauczyciel matematyki" } });
    fireEvent.change(screen.getByLabelText(/Ocena:/i), { target: { value: "4.5" } });
    fireEvent.change(screen.getByLabelText(/Liczba opinii:/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/Lokalizacja:/i), { target: { value: "Warszawa" } });
    fireEvent.change(screen.getByLabelText(/URL zdjęcia:/i), { target: { value: "http://example.com/photo.jpg" } });

    expect(screen.getByLabelText(/Imię:/i)).toHaveValue("Jan Kowalski");
    expect(screen.getByLabelText(/Opis:/i)).toHaveValue("Świetny nauczyciel matematyki");
    expect(screen.getByLabelText(/Ocena:/i)).toHaveValue(4.5);
    expect(screen.getByLabelText(/Liczba opinii:/i)).toHaveValue(10);
    expect(screen.getByLabelText(/Lokalizacja:/i)).toHaveValue("Warszawa");
    expect(screen.getByLabelText(/URL zdjęcia:/i)).toHaveValue("http://example.com/photo.jpg");
  });

  // Test weryfikuje, czy formularz zawiera przycisk Dodaj Korepetytora, potwierdzając jego obecność w interfejsie użytkownika.
  test("zawiera przycisk Dodaj Korepetytora", () => {
    render(
      <MemoryRouter>
        <AddTeacher />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: /Dodaj Korepetytora/i });
    expect(submitButton).toBeInTheDocument();
  });
});
