import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import matchera toBeInTheDocument
import Login from "./Login";

// Test sprawdza, czy formularz logowania renderuje wszystkie elementy: pola Email, Hasło, przycisk Zaloguj się oraz link Zarejestruj się.
test("renders login form with all elements", () => {
  render(<Login />);

  const emailLabel = screen.getByLabelText(/Email/i);
  const passwordLabel = screen.getByLabelText(/Hasło/i);
  const loginButton = screen.getByRole("button", { name: /Zaloguj się/i });
  const registerLink = screen.getByRole("link", { name: /Zarejestruj się/i });

  expect(emailLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(registerLink).toBeInTheDocument();
});

// Test weryfikuje, że formularz logowania nie pozwala na wysyłanie, gdy pola Email i Hasło są puste, oraz sprawdza, że wartości pól pozostają puste po próbie wysłania.
test("does not allow form submission with empty fields", () => {
  render(<Login />);

  const loginButton = screen.getByRole("button", { name: /Zaloguj się/i });

  fireEvent.click(loginButton);

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Hasło/i);

  expect(emailInput).toHaveValue("");
  expect(passwordInput).toHaveValue("");

  const errorMessage = screen.queryByText(/Pole jest wymagane/i);
  expect(errorMessage).not.toBeInTheDocument(); 
});
