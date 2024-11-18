import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // Importujemy useNavigate i useParams
import "./Detail.css";

// Importujemy obrazy z folderu src/photo
import photo1 from "../photo/1.jpg";
import photo2 from "../photo/2.jpg";


function Detail() {
  const { id } = useParams(); // Pobieramy id z URL
  const navigate = useNavigate(); // Hook do nawigacji

  // Przykładowe dane
  const itemData = {
    1: {
      name: "Mat&Education",
      description: "Najlepsza pomoc w matematyce i naukach ścisłych.",
      rating: "5",
      reviews: "659",
      location: "Kościuszki 14, Lubsko",
      profilePicture: photo1, // Użycie zaimportowanego obrazu
      subjects: ["Matematyka", "Fizyka", "Chemia"],
      availability: ["Poniedziałek 16:00 - 18:00", "Środa 14:00 - 16:00"],
      userReviews: [
        { user: "Jan Kowalski", comment: "Świetny korepetytor, bardzo polecam!", rating: 5 },
        { user: "Anna Nowak", comment: "Dzięki lekcjom zdałam maturę z matematyki na 90%!", rating: 5 },
      ],
    },
    2: {
      name: "Kuba - korepetycje",
      description: "Pomoc w języku angielskim oraz matematyce.",
      rating: "4.9",
      reviews: "1645",
      location: "1-go Maja 8, Piła",
      profilePicture: photo2,
      subjects: ["Angielski", "Matematyka"],
      availability: ["Wtorek 15:00 - 17:00", "Czwartek 12:00 - 14:00"],
      userReviews: [
        { user: "Piotr Zieliński", comment: "Bardzo cierpliwy nauczyciel, tłumaczy wszystko jasno.", rating: 5 },
      ],
    },
    3: {
      name: "Piękne lekcje",
      description: "Kreatywne zajęcia dla każdego ucznia.",
      rating: "4.8",
      reviews: "1584",
      location: "Galeria Młociny, Warszawa",
      profilePicture: photo1,
      subjects: ["Plastyka", "Historia sztuki"],
      availability: ["Piątek 10:00 - 12:00", "Sobota 14:00 - 16:00"],
      userReviews: [
        { user: "Ewa Malinowska", comment: "Bardzo ciekawe i inspirujące zajęcia.", rating: 5 },
      ],
    },
    4: {
      name: "Shop korepetycje",
      description: "Profesjonalna pomoc z dojazdem.",
      rating: "5",
      reviews: "1476",
      location: "Ignacego Paderewskiego 51C, Rzeszów",
      profilePicture: photo2,
      subjects: ["Ekonomia", "Marketing"],
      availability: ["Czwartek 13:00 - 15:00", "Sobota 9:00 - 11:00"],
      userReviews: [
        { user: "Krzysztof Biały", comment: "Bardzo profesjonalne podejście do ucznia.", rating: 5 },
      ],
    },
  };

  const item = itemData[id];

  if (!item) {
    return <p>Nie znaleziono szczegółów dla wybranego elementu.</p>;
  }

  return (
    <div className="detail-container">
      <header className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>Cofnij</button>
      </header>
      <div className="detail-content">
        <div className="detail-top">
          <img src={item.profilePicture} alt={`${item.name} profile`} className="profile-picture" />
          <div className="detail-info">
            <h2>{item.name}</h2>
            <p><strong>Ocena:</strong> {item.rating} ({item.reviews} opinii)</p>
            <p><strong>Lokalizacja:</strong> {item.location}</p>
            <p><strong>Opis:</strong> {item.description}</p>
          </div>
        </div>
        <div className="detail-subjects">
          <h3>Przedmioty:</h3>
          <ul>
            {item.subjects.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
        </div>
        <div className="detail-availability">
          <h3>Harmonogram dostępności:</h3>
          <ul>
            {item.availability.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
        <div className="detail-reviews">
          <h3>Opinie użytkowników:</h3>
          {item.userReviews.map((review, index) => (
            <div key={index} className="user-review">
              <p><strong>{review.user}:</strong> {review.comment}</p>
              <p>Ocena: {review.rating}/5</p>
            </div>
          ))}
        </div>
        <button
  className="reservation-btn"
  onClick={() =>
    navigate("/booking", {
      state: { name: item.name, availability: item.availability }, // Przekazujemy dane o korepetytorze
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
