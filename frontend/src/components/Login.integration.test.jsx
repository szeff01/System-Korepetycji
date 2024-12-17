import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve("Success"),
    })
  );

  delete window.location;
  window.location = { assign: jest.fn() };

  global.alert = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders login form with all elements", () => {
  render(<Login />);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Hasło/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Zaloguj się/i })).toBeDisabled();
  expect(screen.getByRole("link", { name: /Zarejestruj się/i })).toBeInTheDocument();
});

test("submit button remains disabled with empty fields", () => {
  render(<Login />);
  expect(screen.getByRole("button", { name: /Zaloguj się/i })).toBeDisabled();
});

test("submit button becomes enabled with valid input", () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
  fireEvent.change(screen.getByLabelText(/Hasło/i), { target: { value: "password123" } });

  expect(screen.getByRole("button", { name: /Zaloguj się/i })).toBeEnabled();
});

test("prevents submission when form is invalid", () => {
  render(<Login />);
  fireEvent.click(screen.getByRole("button", { name: /Zaloguj się/i }));
  expect(global.fetch).not.toHaveBeenCalled();
});

test("allows submission with valid inputs", async () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
  fireEvent.change(screen.getByLabelText(/Hasło/i), { target: { value: "password123" } });
  fireEvent.click(screen.getByRole("button", { name: /Zaloguj się/i }));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  expect(global.alert).toHaveBeenCalledWith("Success");
});

test("clears input fields after successful login", async () => {
  render(<Login />);

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Hasło/i);

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(screen.getByRole("button", { name: /Zaloguj się/i }));

  await waitFor(() => expect(global.alert).toHaveBeenCalledWith("Success"));

  expect(emailInput).toHaveValue("");
  expect(passwordInput).toHaveValue("");
});

test("displays error message when login fails", async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({ json: () => Promise.resolve("Błąd logowania") })
  );

  render(<Login />);

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
  fireEvent.change(screen.getByLabelText(/Hasło/i), { target: { value: "wrongpassword" } });
  fireEvent.click(screen.getByRole("button", { name: /Zaloguj się/i }));

  await waitFor(() => expect(global.alert).toHaveBeenCalledWith("Błąd logowania"));
});

test("displays a generic error message for unexpected errors", async () => {
  global.fetch.mockImplementationOnce(() => Promise.reject(new Error("Network error")));

  render(<Login />);
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
  fireEvent.change(screen.getByLabelText(/Hasło/i), { target: { value: "password123" } });
  fireEvent.click(screen.getByRole("button", { name: /Zaloguj się/i }));

  await waitFor(() => expect(global.alert).toHaveBeenCalledWith("Wystąpił nieoczekiwany błąd."));
});

test("password field masks input", () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/Hasło/i);
  expect(passwordInput).toHaveAttribute("type", "password");
});

test("navigates to registration page when link is clicked", () => {
  render(<Login />);
  const registerLink = screen.getByRole("link", { name: /Zarejestruj się/i });
  expect(registerLink).toHaveAttribute("href", "/register");
});
