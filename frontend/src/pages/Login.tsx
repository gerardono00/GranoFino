import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom"; 
// Se importa Link para el enlace a Registro

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      // Lógica de autenticación ORIGINAL CONSERVADA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/");
    } catch (err: any) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    // 1. Contenedor principal de la página
    <div className="login-container"> 

      {/* 2. Contenedor central del formulario */}
      <div className="login-wrapper">
        
        {/* Cabecera y Logo */}
        <div className="login-header">
          <div className="login-logo">
            ☕
          </div>
          <h2 className="login-title">
            Inicia Sesión en tu Cuenta
          </h2>
        </div>

        {/* Formulario */}
        <div className="login-form-wrapper">
          <div className="login-card">
            
            <form className="login-form" onSubmit={handleSubmit}>
              
              {/* Campo EMAIL */}
              <div>
                <label htmlFor="email" className="form-label">
                  Correo Electrónico
                </label>
                <div className="form-input-wrapper">
                 <input
                  id="email" // <--- ID del INPUT
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email" // <--- Ya tiene placeholder
                  className="form-input"
                  />
                </div>
              </div>

              {/* Campo CONTRASEÑA */}
              <div>
                <div className="password-header">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div className="password-forgot">
                    <a href="#" className="link-forgot">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                <div className="form-input-wrapper">
                 <input
                  id="password"
                  name="password" // <-- CRÍTICO: Asegura que el backend reciba 'password'
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="form-input"
                  />
                </div>
              </div>

              {/* Botón de LOGIN */}
              <div>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Entrar
                </button>
              </div>
            </form>

            {/* Enlace a REGISTRO */}
            <div className="register-link-wrapper">
              <p className="register-text">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="link-register">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}