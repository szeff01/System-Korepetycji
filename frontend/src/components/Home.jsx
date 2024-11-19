import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchCategory, setSearchCategory] = useState(""); // Pole wyszukiwania
  const navigate = useNavigate();

  useEffect(() => {
    // Pobranie korepetytorów z backendu
    fetch("http://localhost:3001/teachers")
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data);
        setFilteredTeachers(data); // Domyślnie pokazuje wszystkich korepetytorów
      })
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  // Obsługa zmiany wyszukiwania
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchCategory(value);

    // Filtrowanie korepetytorów
    const filtered = teachers.filter((teacher) =>
      teacher.categories.some((category) =>
        category.toLowerCase().includes(value)
      )
    );
    setFilteredTeachers(filtered);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Edukusy</h1>
        <div>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Wyloguj
          </button>
          <button
            className="add-teacher-btn"
            onClick={() => navigate("/add-teacher")} // Przejście do formularza dodawania korepetytora
          >
            Dodaj korepetytora
          </button>
        </div>
      </header>

      <div className="search-section">
        <div className="search-overlay">
          <h2>Znajdź swoje</h2>
          <p>Odkryj najlepsze miejsca w okolicy i zarezerwuj wizytę online!</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Szukaj usług lub biznesów"
              value={searchCategory}
              onChange={handleSearch} // Obsługa wyszukiwania
            />
            <button>Szukaj</button>
          </div>
        </div>
      </div>

      <section className="recommended-section">
        <h3>Polecane</h3>
        <div className="recommendations">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="recommendation-card"
              onClick={() => navigate(`/detail/${teacher._id}`)}
            >
              <h4>{teacher.name}</h4>
              <p>Ocena: {teacher.rating} ({teacher.reviews} opinii)</p>
              <p>Lokalizacja: {teacher.location}</p>
              <p>Kategorie: {teacher.categories.join(", ")}</p>
            </div>
          ))}
        </div>
        {filteredTeachers.length === 0 && (
          <p>Brak korepetytorów w tej kategorii.</p>
        )}
      </section>
    </div>
  );
}

export default Home;
