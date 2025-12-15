// server.js (Código CORREGIDO para Render y GitHub Pages)

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/products.routes";
import orderRoutes from "./routes/orders.routes";
import userRoutes from "./routes/users.routes";
import dashboardRoutes from "./routes/dashboard.routes";

// Carga las variables de entorno del archivo .env (solo útil localmente)
dotenv.config();

const app = express();

// 🚨 CAMBIO CRÍTICO 1: Configuración de CORS para permitir la URL de GitHub Pages
app.use(cors({
  // Se añaden ambos orígenes: el local y el de producción (GitHub Pages)
  origin: ["http://localhost:5173", "https://gerardono00.github.io"],
  credentials: true,
}));

app.use(express.json());

// Definición de rutas
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", dashboardRoutes);

// 🚨 CAMBIO CRÍTICO 2: Usar process.env.PORT
// Render inyecta process.env.PORT, si no existe (local), usa 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
  
  // Mensaje de confirmación útil para los logs de Render
  const deploymentUrl = process.env.NODE_ENV === 'production' 
                        ? 'https://granofino-api.onrender.com' 
                        : `http://localhost:${PORT}`;
  
  console.log(`La API está accesible públicamente en: ${deploymentUrl}`);
});