import { type Response, type NextFunction, type Request, Router } from "express";import { db } from "../db";
import { auth, AuthRequest } from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

/*CREAR ORDEN (USUARIO)*/
router.post("/", auth, async (req: AuthRequest, res: Response) => {
  const { total, payment_method } = req.body;

  await db.query(
    "INSERT INTO orders (user_id, total, payment_method, payment_status) VALUES (?, ?, ?, ?)",
    [req.user!.id, total, payment_method, "pagado"]
  );

  res.json({ message: "Orden creada correctamente" });
});

/*OBTENER TODAS LAS ÓRDENES (ADMIN)*/
router.get("/", auth, adminMiddleware, async (_req: AuthRequest, res: Response) => {
  const [orders] = await db.query(`
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

  res.json(orders);
});

export default router;
