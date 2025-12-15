import { Router } from "express";
import db from "../db"; // Asegúrate de que estás importando el pool de PG
import { auth, isAdmin } from "../middlewares/auth";

const router = Router();

// LISTAR USUARIOS (ADMIN)
router.get("/", auth, isAdmin, async (_req, res) => {
  try {
    // CORRECCIÓN: Accedemos a los resultados a través de .rows
    const result = await db.query(
      "SELECT id, name, email, role, active FROM users ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ message: "Error al obtener la lista de usuarios." });
  }
});

// ACTUALIZAR ROL DE USUARIO (ADMIN)
router.put("/:id/role", auth, isAdmin, async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  try {
    // CORRECCIÓN: Usamos placeholders $1 y $2
    const result = await db.query("UPDATE users SET role=$1 WHERE id=$2", [
      role,
      id,
    ]);
    
    if (result.rowCount === 0) {
        return res.status(404).json({ message: "Usuario no encontrado." });
    }
    
    res.json({ message: "Rol actualizado" });
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    res.status(500).json({ message: "Error al actualizar el rol del usuario." });
  }
});

// BLOQUEAR USUARIO (ADMIN)
router.put("/:id/block", auth, isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    // CORRECCIÓN: Usamos placeholder $1. 
    // Nota: 0 se interpreta como FALSE en el tipo BOOLEAN de PostgreSQL.
    const result = await db.query("UPDATE users SET active=0 WHERE id=$1", [
      id,
    ]);
    
    if (result.rowCount === 0) {
        return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json({ message: "Usuario bloqueado" });
  } catch (error) {
    console.error("Error al bloquear usuario:", error);
    res.status(500).json({ message: "Error al bloquear al usuario." });
  }
});

export default router;