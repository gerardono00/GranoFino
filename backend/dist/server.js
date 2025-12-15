"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/auth", auth_routes_1.default);
app.use("/products", products_routes_1.default);
app.use("/orders", orders_routes_1.default);
app.use(express_1.default.json());
// Rutas de prueba
app.get("/", (req, res) => {
    res.send("API de El Grano Fino funcionando");
});
// Obtener productos
app.get("/products", async (req, res) => {
    const [rows] = await db_1.db.query("SELECT * FROM products");
    res.json(rows);
});
app.listen(3000, () => {
    console.log("Servidor backend corriendo en http://localhost:3000");
});
