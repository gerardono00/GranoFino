import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db"; 

const router = Router();

// REGISTRO
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hashedPassword]
    );


    res.json({ message: "Usuario registrado" });

  } catch (error: any) {
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
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const rows = result.rows; // Los datos en PostgreSQL están en .rows

    if (!rows.length) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    
    if (!user.active) {
        return res.status(403).json({ message: "Usuario bloqueado" });
    }


    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

export default router;