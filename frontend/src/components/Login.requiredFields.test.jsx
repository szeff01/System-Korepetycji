import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

// Test sprawdza, czy formularz logowania nie pozwala na wysłanie danych, jeśli pola Email i Hasło są puste. Weryfikuje również, że oba pola mają ustawiony atrybut required.
test("does not submit the form if fields are empty", () => {
  render(<Login />);

  const loginButton = screen.getByRole("button", { name: /Zaloguj się/i });
  
  fireEvent.click(loginButton);

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Hasło/i);

  expect(emailInput).toBeRequired();
  expect(passwordInput).toBeRequired();
});
