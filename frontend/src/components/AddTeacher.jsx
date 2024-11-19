import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTeacher.css";

function AddTeacher() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rating: "",
    reviews: "",
    location: "",
    profilePicture: "",
    availability: [], // Tablica dostępnych godzin
    categories: [], // Tablica dla wielu kategorii
  });
  const [availabilityInput, setAvailabilityInput] = useState({
    day: "",
    from: "",
    to: "",
  });
  const [categoryInput, setCategoryInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAvailability = () => {
    if (availabilityInput.day && availabilityInput.from && availabilityInput.to) {
      const availabilityString = `${availabilityInput.day} ${availabilityInput.from} - ${availabilityInput.to}`;
      setFormData((prevData) => ({
        ...prevData,
        availability: [...prevData.availability, availabilityString],
      }));
      setAvailabilityInput({ day: "", from: "", to: "" });
    }
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        categories: [...prevData.categories, categoryInput.trim()],
      }));
      setCategoryInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nie udało się dodać korepetytora");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dodano korepetytora:", data);
        alert("Korepetytor został dodany!");
        navigate("/"); // Powrót na stronę główną
      })
      .catch((error) => {
        console.error("Błąd podczas dodawania korepetytora:", error);
        alert("Wystąpił błąd podczas dodawania korepetytora.");
      });
  };

  return (
    <div className="add-teacher-container">
      <header className="add-teacher-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Cofnij
        </button>
        <h2>Dodaj Korepetytora</h2>
      </header>
      <form className="add-teacher-form" onSubmit={handleSubmit}>
        <label>
          Imię:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Opis:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Ocena:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            required
          />
        </label>
        <label>
          Liczba opinii:
          <input
            type="number"
            name="reviews"
            value={formData.reviews}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Lokalizacja:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          URL zdjęcia:
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Kategorie:
          <div className="category-input">
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            >
              <option value="" disabled>
                Wybierz kategorię
              </option>
              <option value="Matematyka">Matematyka</option>
              <option value="Polski">Polski</option>
              <option value="Angielski">Angielski</option>
              <option value="Chemia">Chemia</option>
              <option value="Fizyka">Fizyka</option>
              <option value="Historia">Historia</option>
              <option value="Biologia">Biologia</option>
            </select>
            <button type="button" onClick={handleAddCategory}>
              Dodaj
            </button>
          </div>
          <ul>
            {formData.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </label>
        <label>
          Dostępność:
          <div className="availability-input">
            <select
              value={availabilityInput.day}
              onChange={(e) =>
                setAvailabilityInput((prev) => ({
                  ...prev,
                  day: e.target.value,
                }))
              }
            >
              <option value="" disabled>
                Wybierz dzień
              </option>
              <option value="Poniedziałek">Poniedziałek</option>
              <option value="Wtorek">Wtorek</option>
              <option value="Środa">Środa</option>
              <option value="Czwartek">Czwartek</option>
              <option value="Piątek">Piątek</option>
              <option value="Sobota">Sobota</option>
              <option value="Niedziela">Niedziela</option>
            </select>
            <input
              type="time"
              value={availabilityInput.from}
              onChange={(e) =>
                setAvailabilityInput((prev) => ({
                  ...prev,
                  from: e.target.value,
                }))
              }
              required
            />
            <input
              type="time"
              value={availabilityInput.to}
              onChange={(e) =>
                setAvailabilityInput((prev) => ({
                  ...prev,
                  to: e.target.value,
                }))
              }
              required
            />
            <button type="button" onClick={handleAddAvailability}>
              Dodaj
            </button>
          </div>
          <ul>
            {formData.availability.map((slot, index) => (
              <li key={index}>{slot}</li>
            ))}
          </ul>
        </label>
        <button type="submit" className="submit-btn">
          Dodaj Korepetytora
        </button>
      </form>
    </div>
  );
}

export default AddTeacher;
