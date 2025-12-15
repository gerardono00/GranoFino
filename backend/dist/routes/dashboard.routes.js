"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// REGISTRO
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        const result = await db_1.default.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id", [name, email, hashedPassword]);
        res.json({ message: "Usuario registrado" });
    }
    catch (error) {
        if (error.code === '23505') { // Código de error de PostgreSQL para violación de UNIQUE
            return res.status(409).json({ message: "El correo electrónico ya está registrado." });
        }
        console.error("Error al registrar usuario en PostgreSQL:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});
// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Sintaxis de PostgreSQL: Usamos $1
        // 2. Acceso a resultados: Obtenemos el objeto 'result', los datos están en 'result.rows'
        const result = await db_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
        const rows = result.rows; // Los datos en PostgreSQL están en .rows
        if (!rows.length) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const user = rows[0];
        const valid = await bcryptjs_1.default.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        if (!user.active) {
            return res.status(403).json({ message: "Usuario bloqueado" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});
exports.default = router;
