import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NuevoNavBar from "../../Components/NuevoNavBar";
import Footer from "../../Components/Footer";

const API_URL = "http://localhost:3001/users";

const LoginUser = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}?email=${form.email}&password=${form.password}`);
    const users = await res.json();
    if (users.length === 1) {
      setMsg("Login exitoso. ¡Bienvenido!");
      localStorage.setItem('isLoggedIn', 'true');
      navigate("/mi-perfil");
    } else {
      setMsg("Email o contraseña incorrectos.");
    }
  };

  return (
    <>
      <NuevoNavBar />
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, width: "100%", background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>Iniciar Sesión</h2>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
          <button type="submit" style={{ width: "100%", padding: 12, borderRadius: 6, background: "#232F3E", color: "#fff", fontWeight: "bold", border: "none" }}>Ingresar</button>
          {msg && <div style={{ marginTop: 16, color: "red", textAlign: "center" }}>{msg}</div>}
          <div style={{ marginTop: 24, textAlign: "center" }}>
            ¿No tenés cuenta?{" "}
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#232F3E",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => navigate("/register")}
            >
              Registrate
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginUser;