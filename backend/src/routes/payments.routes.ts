import { Router } from "express";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import { paypalClient } from "../config/paypal";
import { auth, AuthRequest } from "../middlewares/auth";
import db from "../db"; // Asegúrate de que estás importando el pool de PG

const router = Router();

router.post("/oxxo", auth, async (req: AuthRequest, res) => {
  const { total } = req.body;

  try {
    // 1. Lógica de Creación de Orden en PayPal (No requiere cambios)
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

    // 2. Lógica de Inserción en PostgreSQL
    // CORRECCIÓN: Usamos placeholders $1, $2, $3, $4.
    await db.query(
      "INSERT INTO orders (user_id, total, payment_method, payment_status) VALUES ($1, $2, $3, $4)",
      [req.user!.id, total, "oxxo", "pendiente"]
    );

    res.json(order.result);

  } catch (error) {
    console.error("Error al procesar pago Oxxo/PayPal:", error);
    // Es buena práctica manejar errores tanto de PayPal como de DB
    res.status(500).json({ message: "Error al procesar el pago y registrar la orden." });
  }
});

export default router;