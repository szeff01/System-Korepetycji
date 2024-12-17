import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddTeacher from "./AddTeacher";

// Test sprawdza, czy formularz wyświetla błąd walidacyjny, gdy użytkownik próbuje go wysłać z pustym polem Imię. Weryfikuje, że walidacja działa poprawnie, a pole zawiera komunikat błędu.
test("Formularz wyświetla błąd, gdy pole Imię jest puste", () => {
  render(
    <MemoryRouter>
      <AddTeacher />
    </MemoryRouter>
  );

  const submitButton = screen.getByRole("button", { name: /Dodaj Korepetytora/i });

  fireEvent.click(submitButton);

  const nameInput = screen.getByLabelText(/Imię:/i);
  expect(nameInput.validationMessage).not.toBe("");
});
