import React, { useState } from "react";
import "./Register.css"; // Stylizacja

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:3001/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data);
        if (data === "Successfully registered") {
          window.location.href = "/login";
        }
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Rejestracja</h2>
        <form onSubmit={handleSubmit}>
          <label>Imię</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Hasło</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Zarejestruj się</button>
        </form>
        <p>
          Masz już konto? <a href="/login">Zaloguj się</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
