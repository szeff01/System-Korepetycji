import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; 
import Register from "./Register";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve("Successfully registered"),
  })
);

describe("Register Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  // Test sprawdza, czy formularz rejestracji renderuje wszystkie wymagane elementy, takie jak pola Imię, Email, Hasło oraz przycisk Zarejestruj się.
  test("renders Register form correctly", () => {
    render(<Register />);

    expect(screen.getByText("Rejestracja")).toBeInTheDocument();
    expect(screen.getByLabelText("Imię")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Hasło")).toBeInTheDocument();
    expect(screen.getByText("Zarejestruj się")).toBeInTheDocument();
  });

  // Test weryfikuje, czy wartości pól formularza są poprawnie aktualizowane po wpisaniu danych (Imię, Email, Hasło).
  test("updates input values on change", async () => {
    render(<Register />);

    const nameInput = screen.getByLabelText("Imię");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Hasło");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "password123");

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  // Test sprawdza, czy po wypełnieniu formularza i kliknięciu przycisku Zarejestruj się, funkcja fetch zostaje wywołana z odpowiednim adresem URL, metodą POST oraz prawidłowym ciałem żądania zawierającym dane użytkownika.
  test("submits the form and calls fetch", async () => {
    render(<Register />);

    const nameInput = screen.getByLabelText("Imię");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Hasło");
    const submitButton = screen.getByText("Zarejestruj się");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "password123");

    fireEvent.click(submitButton);

    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:3001/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      }),
    });
  });
});
