import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom"; 
import AddTeacher from "./AddTeacher";

// Test sprawdza, czy użytkownik może dodać nową kategorię do listy w komponencie AddTeacher. Symuluje wybór kategorii „Matematyka” z pola wyboru oraz kliknięcie przycisku Dodaj, a następnie weryfikuje, czy kategoria pojawiła się na liście. Poprawne działanie potwierdza, że mechanizm dodawania kategorii działa prawidłowo.

test("Użytkownik może dodać nową kategorię do listy", () => {
  render(
    <MemoryRouter>
      <AddTeacher />
    </MemoryRouter>
  );

  const categorySection = screen.getByText(/Kategorie:/i).closest("label");

  const categorySelect = within(categorySection).getByRole("combobox");
  const addButton = within(categorySection).getByRole("button", { name: /Dodaj/i });

  fireEvent.change(categorySelect, { target: { value: "Matematyka" } });

  fireEvent.click(addButton);

  const categoryList = within(categorySection).getByRole("list");

  const addedCategory = within(categoryList).getByText("Matematyka");
  expect(addedCategory).toBeInTheDocument();
});
