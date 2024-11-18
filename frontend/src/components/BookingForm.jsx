import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation do przekazywania danych
import "./BookingForm.css";

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Odbieramy dane o korepetytorze z location.state
  const { name, availability } = location.state || { name: "Nieznany", availability: [] };

  const handleBack = () => {
    navigate(-1); // Powrót do poprzedniej strony
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Rezerwacja potwierdzona!");
    navigate("/home"); // Przenosimy użytkownika na stronę główną po potwierdzeniu
  };

  return (
    <div className="booking-container">
      <header className="booking-header">
        <button className="back-btn" onClick={handleBack}>Cofnij</button>
        <h2>Formularz rezerwacji</h2>
      </header>
      <div className="booking-content">
        <h3>Korepetytor: {name}</h3>
        <form onSubmit={handleSubmit}>
          <h4>Wybierz dostępny termin:</h4>
          <ul>
            {availability.map((slot, index) => (
              <li key={index}>
                <label>
                  <input type="radio" name="slot" value={slot} required /> {slot}
                </label>
              </li>
            ))}
          </ul>
          <button type="submit" className="confirm-btn">Potwierdź rezerwację</button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
