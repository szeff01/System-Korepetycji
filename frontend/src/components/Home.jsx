import React from "react";
import { Link } from "react-router-dom"; // Importujemy Link z react-router-dom
import "./Home.css";

function Home() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Edukusy</h1>
        <button className="logout-btn" onClick={handleLogout}>Wyloguj</button>
      </header>

      <div className="search-section">
        <div className="search-overlay">
          <h2>Znajdź swoje</h2>
          <p>Odkryj najlepsze miejsca w okolicy i zarezerwuj wizytę online!</p>
          <div className="search-bar">
            <input type="text" placeholder="Szukaj usług lub biznesów" />
            <button>Szukaj</button>
          </div>
          <div className="categories">
            {["Matematyka", "Polski", "Niemiecki", "Angielski", "Chemia", "Biologia", "Hiszpański", "Geografia", "Więcej..."].map((category) => (
              <button key={category} className="category-btn">{category}</button>
            ))}
          </div>
        </div>
      </div>

      <section className="recommended-section">
        <h3>Polecane</h3>
        <div className="recommendations">
          {[
            { id: 1, name: "Mat&Education", rating: "5", reviews: "659", location: "Kościuszki 14, Lubsko" },
            { id: 2, name: "Kuba - korepetycje", rating: "4.9", reviews: "1645", location: "1-go Maja 8, Piła" },
            { id: 3, name: "Piękne lekcje", rating: "4.8", reviews: "1584", location: "Galeria Młociny, Warszawa" },
            { id: 4, name: "Shop korepetycje", rating: "5", reviews: "1476", location: "Ignacego Paderewskiego 51C, Rzeszów" },
          ].map((item) => (
            <Link key={item.id} to={`/detail/${item.id}`} className="recommendation-card">
              <h4>{item.name}</h4>
              <p>Ocena: {item.rating} ({item.reviews} opinii)</p>
              <p>Lokalizacja: {item.location}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
