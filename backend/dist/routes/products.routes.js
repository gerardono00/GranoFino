"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// OBTENER PRODUCTOS (público)
router.get("/", async (_req, res) => {
    const [rows] = await db_1.db.query("SELECT * FROM products");
    res.json(rows);
});
// CREAR PRODUCTO (admin)
router.post("/", auth_1.auth, auth_1.isAdmin, async (req, res) => {
    const { name, description, price, image, category } = req.body;
    await db_1.db.query("INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)", [name, description, price, image, category]);
    res.json({ message: "Producto creado" });
});
// ACTUALIZAR
router.put("/:id", auth_1.auth, auth_1.isAdmin, async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    await db_1.db.query("UPDATE products SET name=?, description=?, price=? WHERE id=?", [name, description, price, id]);
    res.json({ message: "Producto actualizado" });
});
// ELIMINAR
router.delete("/:id", auth_1.auth, auth_1.isAdmin, async (req, res) => {
    await db_1.db.query("DELETE FROM products WHERE id=?", [req.params.id]);
    res.json({ message: "Producto eliminado" });
});
exports.default = router;
