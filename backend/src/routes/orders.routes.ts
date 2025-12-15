import { type Response, type NextFunction, type Request, Router } from "express";
import db from "../db"; // Asegúrate de que estás importando el pool de PG
import { auth, AuthRequest } from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

/*CREAR ORDEN (USUARIO)*/
router.post("/", auth, async (req: AuthRequest, res: Response) => {
  const { total, payment_method } = req.body;

  try {
    // CORRECCIÓN: Usamos placeholders $1, $2, $3, $4. 
    // Añadimos RETURNING id para obtener el ID de la orden creada.
    const result = await db.query(
      "INSERT INTO orders (user_id, total, payment_method, payment_status) VALUES ($1, $2, $3, $4) RETURNING id",
      [req.user!.id, total, payment_method, "pagado"]
    );

    // Opcional: Obtener el ID de la orden
    const orderId = result.rows[0].id;

    res.json({ 
      message: "Orden creada correctamente",
      orderId: orderId 
    });

  } catch (error) {
    console.error("Error al crear orden en PostgreSQL:", error);
    res.status(500).json({ message: "Error interno del servidor al crear la orden." });
  }
});

/*OBTENER TODAS LAS ÓRDENES (ADMIN)*/
router.get("/", auth, adminMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    // CORRECCIÓN: Accedemos a los resultados a través de .rows
    const result = await db.query(`
      SELECT 
        orders.id,
        users.name,
        users.email,
        orders.total,
        orders.payment_method,
        orders.payment_status,
        orders.created_at
      FROM orders
      JOIN users ON orders.user_id = users.id
      ORDER BY orders.created_at DESC
    `);

    // Los datos están en result.rows
    res.json(result.rows);
    
  } catch (error) {
    console.error("Error al obtener órdenes en PostgreSQL:", error);
    res.status(500).json({ message: "Error interno del servidor al obtener las órdenes." });
  }
});

export default router;