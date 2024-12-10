import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../routes/login";
import Register from "../routes/register";
import Home from "../routes/home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
