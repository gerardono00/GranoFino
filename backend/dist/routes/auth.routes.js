"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const router = (0, express_1.Router)();
// REGISTRO
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    await db_1.db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
    res.json({ message: "Usuario registrado" });
});
// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const [rows] = await db_1.db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const user = rows[0];
    const valid = await bcryptjs_1.default.compare(password, user.password);
    if (!valid) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
});
exports.default = router;
