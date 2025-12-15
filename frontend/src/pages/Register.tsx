import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registro exitoso");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="login-container"> 

      {/* 2. Contenedor central del formulario */}
      <div className="login-wrapper">
        
        {/* Cabecera y Logo */}
        <div className="login-header">
          <div className="login-logo">
            ☕
          </div>
          <h2 className="login-title">
            Crear Nueva Cuenta
          </h2>
        </div>

        {/* Formulario */}
        <div className="login-form-wrapper">
          <div className="login-card">
            
            <form className="login-form" onSubmit={handleSubmit}>
              
              {/* Campo NOMBRE */}
              <div>
                <label htmlFor="name" className="form-label">Nombre Completo</label>
                <div className="form-input-wrapper">
                    <input
                      id="name"
                      name="name" 
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                    />
                </div>
              </div>

              {/* Campo EMAIL */}
              <div>
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <div className="form-input-wrapper">
                    <input
                      id="email"
                      name="email" 
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                </div>
              </div>

              {/* Campo CONTRASEÑA */}
              <div>
                <label htmlFor="password" className="form-label">Contraseña</label>
                <div className="form-input-wrapper">
                    <input
                      id="password"
                      name="password" 
                      placeholder="Contraseña"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input"
                    />
                </div>
              </div>

              <div>
                <button type="submit" className="btn-primary">
                  Registrarse
                </button>
              </div>
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
}