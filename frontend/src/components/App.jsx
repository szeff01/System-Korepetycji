import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Detail from "./Detail";
import BookingForm from "./BookingForm"; // Import nowego komponentu

function App() {
  return (
    <div style={{ marginTop: "-3.5rem" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/booking" element={<BookingForm />} /> {/* Trasa dla formularza */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
