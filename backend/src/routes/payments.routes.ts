import { Router } from "express";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import { paypalClient } from "../config/paypal";
import { auth, AuthRequest } from "../middlewares/auth";
import { db } from "../db";

const router = Router();

router.post("/oxxo", auth, async (req: AuthRequest, res) => {
  const { total } = req.body;

  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "MXN",
          value: total.toFixed(2),
        },
      },
    ],
    payment_source: {
      oxxo: {
        name: "El Grano Fino",
      },
    },
  });

  const order = await paypalClient.execute(request);

  await db.query(
    "INSERT INTO orders (user_id, total, payment_method, payment_status) VALUES (?, ?, ?, ?)",
    [req.user!.id, total, "oxxo", "pendiente"]
  );

  res.json(order.result);
});

export default router;
