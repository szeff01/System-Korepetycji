import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingForm({ teacherId }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    // Pobranie dostępnych godzin dla danego korepetytora
    if (selectedDate) {
      fetch(
        `http://localhost:3001/teachers/${teacherId}/availability?date=${selectedDate.toISOString()}`
      )
        .then((response) => response.json())
        .then((data) => setAvailableSlots(data))
        .catch((error) => console.error("Error fetching availability:", error));
    }
  }, [selectedDate, teacherId]);

  const handleBooking = () => {
    if (!selectedSlot) {
      setBookingStatus("Wybierz godzinę, aby zarezerwować termin.");
      return;
    }

    fetch(`http://localhost:3001/teachers/${teacherId}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: selectedDate.toISOString(),
        time: selectedSlot,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nie udało się zarezerwować terminu.");
        }
        return response.json();
      })
      .then((data) => {
        setBookingStatus("Rezerwacja powiodła się!");
        setAvailableSlots((prev) =>
          prev.filter((slot) => slot !== selectedSlot)
        );
      })
      .catch((error) => {
        setBookingStatus("Ten termin jest już zajęty.");
        console.error("Error booking slot:", error);
      });
  };

  return (
    <div>
      <h3>Zarezerwuj termin</h3>
      <label>
        Wybierz datę:
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          placeholderText="Wybierz datę"
        />
      </label>
      {selectedDate && (
        <div>
          <h4>Dostępne godziny:</h4>
          {availableSlots.length > 0 ? (
            <ul>
              {availableSlots.map((slot) => (
                <li key={slot}>
                  <button
                    onClick={() => setSelectedSlot(slot)}
                    disabled={selectedSlot === slot}
                  >
                    {slot}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Brak dostępnych godzin na ten dzień.</p>
          )}
        </div>
      )}
      <button onClick={handleBooking}>Zarezerwuj</button>
      {bookingStatus && <p>{bookingStatus}</p>}
    </div>
  );
}

export default BookingForm;
