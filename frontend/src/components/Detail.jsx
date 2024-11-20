import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Detail.css";

function Detail() {
  const { id } = useParams(); // Pobieramy ID korepetytora z URL
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pobranie danych o korepetytorze z backendu
    fetch(`http://localhost:3001/teachers/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych korepetytora");
        }
        return response.json();
      })
      .then((data) => {
        setTeacher(data); // Zapisujemy dane korepetytora w stanie
        setLoading(false); // Ustawiamy stan ładowania na false
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Ładowanie danych...</p>;
  }

  if (!teacher) {
    return <p>Nie znaleziono korepetytora.</p>;
  }

  return (
    <div className="detail-container">
      <header className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>Cofnij</button>
      </header>
      <div className="detail-content">
        <div className="detail-top">
          <img src={teacher.profilePicture} alt={`${teacher.name} profile`} className="profile-picture" />
          <div className="detail-info">
            <h2>{teacher.name}</h2>
            <p><strong>Ocena:</strong> {teacher.rating} ({teacher.reviews} opinii)</p>
            <p><strong>Lokalizacja:</strong> {teacher.location}</p>
            <p><strong>Opis:</strong> {teacher.description}</p>
          </div>
        </div>
        <div className="detail-availability">
          <h3>Harmonogram dostępności:</h3>
          <ul>
            {teacher.availability.map((slot, index) => (
              <li key={index}>{slot}</li>
            ))}
          </ul>
        </div>
        <button
          className="reservation-btn"
          onClick={() =>
            navigate("/booking", {
              state: { name: teacher.name, availability: teacher.availability },
            })
          }
        >
          Zarezerwuj spotkanie
        </button>
      </div>
    </div>
  );
}

export default Detail;
