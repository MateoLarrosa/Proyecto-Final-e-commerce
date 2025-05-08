import React, { useState } from "react";
import NuevoNavBar from "../../Components/NuevoNavBar";
import Footer from "../../Components/Footer";

const API_URL = "http://localhost:3001/users";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    role: "Cliente"
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verifica si el email ya existe
    const res = await fetch(`${API_URL}?email=${form.email}`);
    const users = await res.json();
    if (users.length > 0) {
      setMsg("El email ya está registrado.");
      return;
    }
    // Guarda el usuario
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setMsg("Usuario registrado correctamente.");
    setForm({ username: "", email: "", password: "", nombre: "", apellido: "", role: "Cliente" });
  };

  return (
    <>
      <NuevoNavBar />
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, width: "100%", background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>Registro de Usuario</h2>
          <input name="username" placeholder="Nombre de usuario" value={form.username} onChange={handleChange} required style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
          <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }} />
          <button type="submit" style={{ width: "100%", padding: 12, borderRadius: 6, background: "#232F3E", color: "#fff", fontWeight: "bold", border: "none" }}>Registrarse</button>
          {msg && <div style={{ marginTop: 16, color: "red", textAlign: "center" }}>{msg}</div>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;