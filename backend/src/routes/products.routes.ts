import { Router } from "express";
import db from "../db"; // Asegúrate de que estás importando el pool de PG
import { auth, AuthRequest } from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

/* LISTAR productos */
router.get("/", async (_req, res) => {
  try {
    // CORRECCIÓN: Accedemos a los resultados a través de .rows
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al listar productos:", error);
    res.status(500).json({ message: "Error al obtener productos." });
  }
});

/* CREAR producto (admin) */
router.post("/", auth, adminMiddleware, async (req: AuthRequest, res) => {
  const { name, description, price, image, category } = req.body;

  try {
    // CORRECCIÓN: Usamos placeholders $1, $2, $3, $4, $5
    await db.query(
      "INSERT INTO products (name, description, price, image, category) VALUES ($1, $2, $3, $4, $5)",
      [name, description, price, image, category]
    );

    res.json({ message: "Producto creado" });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear el producto." });
  }
});

/* ACTUALIZAR producto (admin) */
router.put("/:id", auth, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category } = req.body;

  try {
    // CORRECCIÓN: Usamos placeholders $1, $2, $3, $4, $5 para los valores
    // y $6 para el WHERE id.
    const result = await db.query(
      `UPDATE products 
       SET name=$1, description=$2, price=$3, image=$4, category=$5 
       WHERE id=$6`,
      [name, description, price, image, category, id]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "Producto no encontrado." });
    }

    res.json({ message: "Producto actualizado" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto." });
  }
});

/* ELIMINAR producto (admin) */
router.delete("/:id", auth, adminMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // CORRECCIÓN: Usamos placeholder $1
    const result = await db.query("DELETE FROM products WHERE id = $1", [id]);

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "Producto no encontrado." });
    }
    
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar el producto." });
  }
});

export default router;