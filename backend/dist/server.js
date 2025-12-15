"use strict";
// server.js (Código CORREGIDO para Render y GitHub Pages)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
// Carga las variables de entorno del archivo .env (solo útil localmente)
dotenv_1.default.config();
const app = (0, express_1.default)();
// 🚨 CAMBIO CRÍTICO 1: Configuración de CORS para permitir la URL de GitHub Pages
app.use((0, cors_1.default)({
    // Se añaden ambos orígenes: el local y el de producción (GitHub Pages)
    origin: ["http://localhost:5173", "https://gerardono00.github.io"],
    credentials: true,
}));
app.use(express_1.default.json());
// Definición de rutas
app.use("/auth", auth_routes_1.default);
app.use("/products", products_routes_1.default);
app.use("/orders", orders_routes_1.default);
app.use("/users", users_routes_1.default);
app.use("/dashboard", dashboard_routes_1.default);
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
