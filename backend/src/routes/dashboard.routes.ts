import { Router } from "express";
import { db } from "../db";
import { auth, isAdmin } from "../middlewares/auth";

const router = Router();

router.get("/", auth, isAdmin, async (_req, res) => {
  const [[users]]: any = await db.query("SELECT COUNT(*) total FROM users");
  const [[products]]: any = await db.query("SELECT COUNT(*) total FROM products");
  const [[orders]]: any = await db.query("SELECT COUNT(*) total FROM orders");
  const [[revenue]]: any = await db.query(
    "SELECT IFNULL(SUM(total),0) total FROM orders WHERE payment_status='pagado'"
  );

  res.json({
    users: users.total,
    products: products.total,
    orders: orders.total,
    revenue: revenue.total,
  });
});

export default router;
