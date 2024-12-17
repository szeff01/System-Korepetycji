import React, { useState, useEffect } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data === "Success") {
        alert("Success");
        setEmail("");
        setPassword("");
        window.location.href = "/home";
      } else {
        alert(data || "Błąd logowania");
      }
    } catch (error) {
      alert("Wystąpił nieoczekiwany błąd.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Logowanie</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Hasło</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={!isFormValid}>
            Zaloguj się
          </button>
        </form>
        <p>
          Nie masz konta? <a href="/register">Zarejestruj się</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
