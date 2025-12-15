import { Router } from "express";
import { db } from "../db";
import { auth, AuthRequest } from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

/* LISTAR productos */
router.get("/", async (_req, res) => {
  const [rows] = await db.query("SELECT * FROM products");
  res.json(rows);
});

/* CREAR producto (admin) */
router.post("/", auth, adminMiddleware, async (req: AuthRequest, res) => {
  const { name, description, price, image, category } = req.body;

  await db.query(
    "INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)",
    [name, description, price, image, category]
  );

  res.json({ message: "Producto creado" });
});

/* ACTUALIZAR producto (admin) */
router.put("/:id", auth, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category } = req.body;

  await db.query(
    `UPDATE products 
     SET name=?, description=?, price=?, image=?, category=? 
     WHERE id=?`,
    [name, description, price, image, category, req.params.id]
  );

  res.json({ message: "Producto actualizado" });
});

/* ELIMINAR producto (admin) */
router.delete("/:id", auth, adminMiddleware, async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM products WHERE id = ?", [id]);

  res.json({ message: "Producto eliminado" });
});

export default router;
