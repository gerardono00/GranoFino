import { Router } from "express";
import { db } from "../db";
import { auth, isAdmin } from "../middlewares/auth";

const router = Router();

router.get("/", auth, isAdmin, async (_req, res) => {
  const [users] = await db.query(
    "SELECT id, name, email, role, active FROM users"
  );
  res.json(users);
});

router.put("/:id/role", auth, isAdmin, async (req, res) => {
  const { role } = req.body;
  await db.query("UPDATE users SET role=? WHERE id=?", [
    role,
    req.params.id,
  ]);
  res.json({ message: "Rol actualizado" });
});

router.put("/:id/block", auth, isAdmin, async (req, res) => {
  await db.query("UPDATE users SET active=0 WHERE id=?", [
    req.params.id,
  ]);
  res.json({ message: "Usuario bloqueado" });
});

export default router;
