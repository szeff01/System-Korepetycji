import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

beforeEach(() => {
  jest.clearAllMocks();
});

test("calls fetch with email and password on form submission", async () => {
  // Mockowanie funkcji fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve("Success"),
    })
  );

  render(<Login />);

  // Wpisanie danych do formularza
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Hasło/i);
  const loginButton = screen.getByRole("button", { name: /Zaloguj się/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Kliknięcie przycisku logowania
  fireEvent.click(loginButton);

  // Oczekiwanie na wywołanie fetch z poprawnymi parametrami
  expect(global.fetch).toHaveBeenCalledWith("http://127.0.0.1:3001/login", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: "test@example.com",
      password: "password123",
    }),
  });
});
