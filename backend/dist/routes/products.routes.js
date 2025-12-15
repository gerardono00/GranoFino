"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db")); // Asegúrate de que estás importando el pool de PG
const auth_1 = require("../middlewares/auth");
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const router = (0, express_1.Router)();
/* LISTAR productos */
router.get("/", async (_req, res) => {
    try {
        // CORRECCIÓN: Accedemos a los resultados a través de .rows
        const result = await db_1.default.query("SELECT * FROM products ORDER BY id DESC");
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error al listar productos:", error);
        res.status(500).json({ message: "Error al obtener productos." });
    }
});
/* CREAR producto (admin) */
router.post("/", auth_1.auth, admin_middleware_1.default, async (req, res) => {
    const { name, description, price, image, category } = req.body;
    try {
        // CORRECCIÓN: Usamos placeholders $1, $2, $3, $4, $5
        await db_1.default.query("INSERT INTO products (name, description, price, image, category) VALUES ($1, $2, $3, $4, $5)", [name, description, price, image, category]);
        res.json({ message: "Producto creado" });
    }
    catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error al crear el producto." });
    }
});
/* ACTUALIZAR producto (admin) */
router.put("/:id", auth_1.auth, admin_middleware_1.default, async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, category } = req.body;
    try {
        // CORRECCIÓN: Usamos placeholders $1, $2, $3, $4, $5 para los valores
        // y $6 para el WHERE id.
        const result = await db_1.default.query(`UPDATE products 
       SET name=$1, description=$2, price=$3, image=$4, category=$5 
       WHERE id=$6`, [name, description, price, image, category, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        res.json({ message: "Producto actualizado" });
    }
    catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ message: "Error al actualizar el producto." });
    }
});
/* ELIMINAR producto (admin) */
router.delete("/:id", auth_1.auth, admin_middleware_1.default, async (req, res) => {
    const { id } = req.params;
    try {
        // CORRECCIÓN: Usamos placeholder $1
        const result = await db_1.default.query("DELETE FROM products WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        res.json({ message: "Producto eliminado" });
    }
    catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ message: "Error al eliminar el producto." });
    }
});
exports.default = router;
